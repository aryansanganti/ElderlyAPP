import { defineConfig } from 'vite'; // Import defineConfig
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // You can add aliases here
      'zego-uikit-prebuilt': '/node_modules/zego-uikit-prebuilt', // Alias for Zego UIKit if needed
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    hmr: {
      overlay: false, // Disable the error overlay for HMR
    },
  },
  optimizeDeps: {
    include: ['zego-uikit-prebuilt'], // Ensure that the ZegoUIKit package is included in optimized dependencies
  },
});
