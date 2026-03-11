import { defineStore } from "pinia";
import { ref } from "vue";

export interface StoreUserInfo {
  user: string;
  photo: string;
}

export const useI18nLoadStore = defineStore("i18n", () => {
  const i18nDataLoaded = ref(false);
  return { i18nDataLoaded };
});
