import "./style.css";
import "./font.css";
import App from "./App.vue";
import { ViteSSG } from "vite-ssg";
import { routes } from "vue-router/auto-routes";
import type { UserModule } from "./types";

// const app = createApp(App);
// app.use(router);
// const pinia = createPinia();
// app.use(pinia);
// app.use(i18n);
// loadLanguageAsync("zh-cn").finally(() => {
//   app.mount("#app");
// });

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>("./modules/*.ts", {
        eager: true,
      }),
    ).forEach((i) => i.install?.(ctx));
    // ctx.app.use(Previewer)
  },
);
