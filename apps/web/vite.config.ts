import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vueDevTools from "vite-plugin-vue-devtools";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": import.meta.resolve("./src"),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vueDevTools(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        rewrite(path) {
          return path.replace(/^\/api/, "");
        },
        changeOrigin: true,
      },
    },
  },
});
