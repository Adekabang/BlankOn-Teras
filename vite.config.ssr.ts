import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import mdx from 'fumadocs-mdx/vite'
import * as MdxConfig from './source.config'
import { checksumPlugin } from './src/plugins/checksum'
import { rawNewsPlugin } from './src/plugins/raw-news'

const config = defineConfig({
  plugins: [
    checksumPlugin(),
    mdx(MdxConfig),
    rawNewsPlugin(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      preset: 'node',
    }),
    viteReact(),
  ],
})

export default config
