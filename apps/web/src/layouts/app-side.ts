import { onMounted } from "vue";
import { useAppStore } from "./../store/app";

export const useAppSide = () => {
  const store = useAppStore();

  const scrollEventFn = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (!store.isShowAppSide && !store.isCloseAppSide && scrollTop >= 220) {
      store.updateIfFixed(true);
    } else {
      store.updateIfFixed(false);
    }
  };
  const resizeEventFn = () => {
    const screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (screenWidth > 800) {
      store.updateIsShowAppSide(false);
      store.updateIsHidden(false);
      document.documentElement.style.overflow = "";
      if (scrollTop >= 220) {
        store.updateIfFixed(true);
      } else {
        store.updateIfFixed(false);
      }
    }
  };
  onMounted(() => {
    window.addEventListener("scroll", scrollEventFn);
    window.addEventListener("resize", resizeEventFn);

    document.documentElement.addEventListener("click", () => {
      if (store.isShowAppSide) {
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        store.updateIsShowAppSide(false);
        store.updateIsCloseAppSide(true);
        store.updateIsHidden(false);

        document.documentElement.style.overflow = "";
        setTimeout(() => {
          store.updateIsCloseAppSide(false);
          if (scrollTop >= 220) {
            store.updateIfFixed(true);
          }
        }, 200);
      }
    });
  });
  return { store };
};
