import { defineStore } from "pinia";
import { ref } from "vue";

export interface StoreUserInfo {
  user: string;
  photo: string;
}

export const useAppStore = defineStore("app", () => {
  const userInfo = ref<StoreUserInfo>({
    user: "",
    photo: "",
  });
  const isCloseAppSide = ref(false);
  const isShowAppSide = ref(false);
  const ifFixed = ref(false);
  const isHidden = ref(false);

  const updateUserInfo = (data: StoreUserInfo) => {
    userInfo.value = data;
  };
  const updateUserName = (name: string) => {
    userInfo.value.user = name;
  };
  const updateUserPhoto = (photo: string) => {
    userInfo.value.photo = photo;
  };

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
    userInfo,
    isCloseAppSide,
    isShowAppSide,
    ifFixed,
    isHidden,
    updateUserInfo,
    updateUserName,
    updateUserPhoto,
    updateIsCloseAppSide,
    updateIsShowAppSide,
    updateIfFixed,
    updateIsHidden,
  };
});
