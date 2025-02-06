import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  outDir: 'build',
  clean: true,
  platform: 'node',
})
