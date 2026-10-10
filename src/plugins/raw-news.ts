import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'

// fumadocs-mdx compiles every `.md` file it sees, which would turn the news
// articles into components. They are plain Markdown that `@/lib/news` renders
// itself, so replace whatever it produced with the untouched source. Listed
// after `mdx()` so this runs last.
const NEWS_RAW = /\/content\/news\/[^/?]+\.md\?raw$/

export function rawNewsPlugin(): Plugin {
  return {
    name: 'raw-news',
    enforce: 'pre',
    transform(_code, id) {
      if (!NEWS_RAW.test(id)) return
      const file = id.slice(0, id.indexOf('?'))
      return `export default ${JSON.stringify(readFileSync(file, 'utf8'))}`
    },
  }
}
