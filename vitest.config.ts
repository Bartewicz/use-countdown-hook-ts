import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    include: ['**/*.test.ts'],
  },
});
