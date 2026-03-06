import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { i18n, loadLanguageAsync } from "./utils/i18n";

const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.use(i18n);
loadLanguageAsync("zh-cn").finally(() => {
  app.mount("#app");
});
