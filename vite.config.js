import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  typecheck: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
});
