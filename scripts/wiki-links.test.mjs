import { describe, expect, it } from 'vitest'
import { rewriteWikiLinks, wikiUrl } from './wiki-links.mjs'

const FILES = new Set([
  'Goals.md',
  'Glossary.md',
  'README.md',
  'UserGuides/README.md',
  'UserGuides/Docker.md',
  'UserGuides/SecureBoot.md',
  'WikiGuidelines.id.md',
])

const rewrite = (content, sourcePath, locale = 'en') => {
  const missing = []
  const result = rewriteWikiLinks(content, sourcePath, {
    locale,
    knownLocales: ['en', 'id'],
    exists: (repoPath) => FILES.has(repoPath),
    onMissing: (target) => missing.push(target),
  })
  return { result, missing }
}

describe('wikiUrl', () => {
  it('maps pages, READMEs and locale files to their site URLs', () => {
    expect(wikiUrl('Goals.md', 'en', ['en', 'id'])).toBe('/en/wiki/Goals')
    expect(wikiUrl('UserGuides/SecureBoot.md', 'en', ['en', 'id'])).toBe(
      '/en/wiki/UserGuides/SecureBoot',
    )
    expect(wikiUrl('UserGuides/README.md', 'en', ['en', 'id'])).toBe(
      '/en/wiki/UserGuides',
    )
    expect(wikiUrl('README.md', 'en', ['en', 'id'])).toBe('/en/wiki')
    expect(wikiUrl('WikiGuidelines.id.md', 'en', ['en', 'id'])).toBe(
      '/id/wiki/WikiGuidelines',
    )
  })
})

describe('rewriteWikiLinks', () => {
  it('rewrites links relative to the current page', () => {
    expect(
      rewrite('[Docker](./Docker.md)', 'UserGuides/README.md').result,
    ).toBe('[Docker](/en/wiki/UserGuides/Docker)')
    expect(rewrite('[Goals](Goals.md)', 'Glossary.md').result).toBe(
      '[Goals](/en/wiki/Goals)',
    )
    expect(
      rewrite('[Secure Boot](../UserGuides/SecureBoot.md)', 'Releases/Page.md')
        .result,
    ).toBe('[Secure Boot](/en/wiki/UserGuides/SecureBoot)')
    expect(rewrite('[Goals](/Goals.md)', 'UserGuides/Docker.md').result).toBe(
      '[Goals](/en/wiki/Goals)',
    )
  })

  it('keeps anchors and uses the locale of the current page', () => {
    expect(
      rewrite('[Sid](../Glossary.md#debian-sid)', 'UserGuides/Docker.md', 'id')
        .result,
    ).toBe('[Sid](/id/wiki/Glossary#debian-sid)')
  })

  it('leaves external links, anchors, images and code unchanged', () => {
    const content = [
      '[GitHub](https://github.com/BlankOn/blankon-linux/blob/main/Goals.md)',
      '[Top](#top)',
      '![Logo](../assets/logo.png)',
      '`[Goals](Goals.md)`',
      '```\n[Goals](Goals.md)\n```',
    ].join('\n')
    expect(rewrite(content, 'UserGuides/Docker.md').result).toBe(content)
  })

  it('leaves links to missing pages unchanged and reports them', () => {
    const { result, missing } = rewrite(
      '[Old](../ReleaseCycleOld.md)',
      'UserGuides/Docker.md',
    )
    expect(result).toBe('[Old](../ReleaseCycleOld.md)')
    expect(missing).toEqual(['../ReleaseCycleOld.md'])
  })
})
