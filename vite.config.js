import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  alias: {
      react: '/node_modules/react',
      'react-dom': '/node_modules/react-dom',
    },
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       react: '/node_modules/react',
//       'react-dom': '/node_modules/react-dom',
//     },
//   },
// });