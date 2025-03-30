import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'src'), // ✅ Allow access to 'src' folder
        path.resolve(__dirname, 'node_modules/primereact/resources'), // ✅ Allow specific PrimeReact fonts
        path.resolve(__dirname, 'node_modules'), // ✅ Ensure all node_modules are accessible
        path.resolve(__dirname, '../node_modules') // ✅ Allow parent node_modules (if applicable)
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // ✅ Optional alias for cleaner imports
    }
  }
});
