import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: "./",
  base: "./",
  build: {
    outDir: "dist",
    minify: true,
    write: true,
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "target.min.js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: "assets/[ext]/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
      "@src": resolve(__dirname, "./src"),
      "@router": resolve(__dirname, "./router"),
      "@views": resolve(__dirname, "./src/components/views"),
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./utils"),
      "@assets": resolve(__dirname, "./public/assets"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173, // default port for dev
  },
  preview: {
    host: "0.0.0.0",
    port: 4173, // port for preview
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});
