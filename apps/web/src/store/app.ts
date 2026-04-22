import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const isCloseAppSide = ref(false);
  const isShowAppSide = ref(false);
  const ifFixed = ref(false);
  const isHidden = ref(false);

  const updateIsCloseAppSide = (value: boolean) => {
    isCloseAppSide.value = value;
  };
  const updateIsShowAppSide = (value: boolean) => {
    isShowAppSide.value = value;
  };
  const updateIfFixed = (value: boolean) => {
    ifFixed.value = value;
  };
  const updateIsHidden = (value: boolean) => {
    isHidden.value = value;
  };

  return {
    isCloseAppSide,
    isShowAppSide,
    ifFixed,
    isHidden,
    updateIsCloseAppSide,
    updateIsShowAppSide,
    updateIfFixed,
    updateIsHidden,
  };
});
