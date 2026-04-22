import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "./../store/user";
import { useAppStore } from "./../store/app";
import { loadLanguageAsync, i18n } from "@/utils/i18n";

export const useNavTop = () => {
  const route = useRoute();
  const activeIndex = ref(route.path);
  const store = useUserStore();
  const appStore = useAppStore();

  const isShowLoginBox = ref<boolean>(false);
  const data = [
    {
      url: "/",
      name: "app.text.home",
    },
    { url: "/article", name: "app.text.article" },
    { url: "/message", name: "app.text.message" },
    { url: "/link", name: "app.text.link" },
    { url: "/about", name: "app.text.about" },
  ];

  const loginBtnClick = () => {
    isShowLoginBox.value = !isShowLoginBox.value;
  };
  const closeLoginBox = () => {
    isShowLoginBox.value = !isShowLoginBox.value;
  };

  const showAppSide = () => {
    const screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth <= 800) {
      appStore.updateIfFixed(false);

      if (appStore.isShowAppSide) {
        const scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        appStore.updateIsShowAppSide(false);
        appStore.updateIsCloseAppSide(true);
        appStore.updateIsHidden(false);

        document.documentElement.style.overflow = "";
        setTimeout(() => {
          appStore.updateIsCloseAppSide(false);
          if (scrollTop >= 220) {
            appStore.updateIfFixed(true);
          }
        }, 200);
      } else {
        appStore.updateIsShowAppSide(true);
        // appStore.updateIsCloseAppSide(false);
        appStore.updateIsHidden(true);
        document.documentElement.style.overflow = "hidden";
      }
    }
  };

  // 国际化语言切换逻辑
  const currentLang = ref(i18n.global.locale.value);

  const switchLang = async () => {
    const next = currentLang.value === "zh-cn" ? "en" : "zh-cn";
    await loadLanguageAsync(next);
    currentLang.value = next;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
    }
  };

  return {
    store,
    isShowLoginBox,
    activeIndex,
    data,
    loginBtnClick,
    closeLoginBox,
    showAppSide,
    currentLang,
    switchLang,
  };
};
