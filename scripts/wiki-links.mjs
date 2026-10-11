import path from 'path'

const CODE_REGEX = /```[\s\S]*?```|`[^`\n]+`/g
const LINK_REGEX = /(!?)\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g

/**
 * Convert a file or directory name to a URL slug
 */
export function getSlug(filePath) {
  return path
    .basename(filePath, path.extname(filePath))
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Get the site URL of a wiki file, e.g. `UserGuides/Docker.md` → `/en/wiki/UserGuides/Docker`.
 * Mirrors where processDirectory() writes each page.
 */
export function wikiUrl(repoPath, locale, knownLocales) {
  const dirs = path.posix
    .dirname(repoPath)
    .split('/')
    .filter((dir) => dir && dir !== '.')
    .map(getSlug)
  const name = path.posix.basename(repoPath)
  const localeMatch = name.match(/^(.+)\.([a-z]{2})\.md$/)

  let lang = locale
  let slug = getSlug(name)
  if (name.toLowerCase() === 'readme.md') {
    slug = ''
  } else if (localeMatch && knownLocales.includes(localeMatch[2])) {
    lang = localeMatch[2]
    slug = getSlug(localeMatch[1])
  }

  return '/' + [lang, 'wiki', ...dirs, slug].filter(Boolean).join('/')
}

/**
 * Rewrite relative links to wiki pages (`Goals.md`, `../UserGuides/Docker.md#install`)
 * into site URLs. Links inside code, images, external links and anchors are kept.
 * A link to a file that does not exist is kept as written and passed to onMissing.
 */
export function rewriteWikiLinks(
  content,
  sourcePath,
  { locale, knownLocales, exists, onMissing = () => {} },
) {
  const rewrite = (text) =>
    text.replace(LINK_REGEX, (match, bang, label, target, title = '') => {
      if (bang || /^([a-z][a-z0-9+.-]*:|#)/i.test(target)) return match

      const [targetPath, anchor] = target.split('#')
      if (!/\.md$/i.test(targetPath)) return match

      // A leading slash means the repository root, as on GitHub.
      const repoPath = targetPath.startsWith('/')
        ? path.posix.normalize(targetPath.slice(1))
        : path.posix.join(path.posix.dirname(sourcePath), targetPath)

      if (repoPath.startsWith('..') || !exists(repoPath)) {
        onMissing(target)
        return match
      }

      const url =
        wikiUrl(repoPath, locale, knownLocales) + (anchor ? `#${anchor}` : '')
      return `[${label}](${url}${title})`
    })

  let result = ''
  let lastEnd = 0
  for (const block of content.matchAll(CODE_REGEX)) {
    result += rewrite(content.slice(lastEnd, block.index)) + block[0]
    lastEnd = block.index + block[0].length
  }
  return result + rewrite(content.slice(lastEnd))
}
