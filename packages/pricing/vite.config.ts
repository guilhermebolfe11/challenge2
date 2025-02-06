import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [['src/infra/http/controllers/**', 'prisma']],
    globals: true,
    exclude: ['**/node_modules/**', '**/build/**', '**/coverage/**'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
