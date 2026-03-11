import { useI18nLoadStore } from "@/store/i18n";
import type { UserModule } from "@/types";
import { i18n, loadLanguageAsync } from "@/utils/i18n";

export const install: UserModule = ({ app }) => {
  app.use(i18n);
  loadLanguageAsync("zh-cn").then(() => {
    app.runWithContext(() => {
      const i18nLoadStore = useI18nLoadStore();
      i18nLoadStore.i18nDataLoaded = true;
    });
  });
};
