import { useI18nLoadStore } from "@/store/i18n";
import type { UserModule } from "@/types";
import { i18n, loadLanguageAsync } from "@/utils/i18n";

export const install: UserModule = ({ app }) => {
  app.use(i18n);
  const defaultLang = "zh-cn";
  let initLang = defaultLang;
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lang");
    if (saved) initLang = saved;
  }

  loadLanguageAsync(initLang).then(() => {
    app.runWithContext(() => {
      const i18nLoadStore = useI18nLoadStore();
      i18nLoadStore.i18nDataLoaded = true;
    });
  });
};
