import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueRouter from "unplugin-vue-router/vite";
import vueDevTools from "vite-plugin-vue-devtools";
// https://vite.dev/config/
export default defineConfig({
  ssr: {
    noExternal: ["element-plus"],
  },
  resolve: {
    alias: {
      "@": import.meta.resolve("./src"),
    },
  },
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: [],
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
