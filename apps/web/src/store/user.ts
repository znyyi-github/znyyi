import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface StoreUserInfo {
  user: string;
  photo?: string;
}

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<StoreUserInfo>({
    user: "",
    photo: "",
  });
  const isLogin = ref(localStorage.getItem("isLogin") === "true");

  const updateUserInfo = (data: StoreUserInfo) => {
    userInfo.value = data;
  };
  const updateUserName = (name: string) => {
    userInfo.value.user = name;
  };
  const updateUserPhoto = (photo: string) => {
    userInfo.value.photo = photo;
  };
  const updateIsLogin = (value: boolean) => {
    isLogin.value = value;
  };
  watch(isLogin, (val) => {
    localStorage.setItem("isLogin", `${val}`);
  });

  return {
    userInfo,
    updateUserInfo,
    updateUserName,
    updateUserPhoto,
    isLogin,
    updateIsLogin,
  };
});
