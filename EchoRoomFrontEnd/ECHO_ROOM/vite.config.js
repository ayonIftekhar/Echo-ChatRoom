import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    global: 'globalThis' // 👈 Fixes the "global is not defined" error
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill() // 👈 Adds polyfills for Node globals like 'global'
      ]
    }
  }
});
