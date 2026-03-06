import type { UserModule } from "@/types";
import { createPinia } from "pinia";

export const install: UserModule = ({ initialState, app }) => {
  const pinia = createPinia();
  app.use(pinia);
  if (!import.meta.env.SSR) {
    pinia.state.value = initialState.pinia || {};
  } else {
    initialState.pinia = pinia.state.value;
  }
};
