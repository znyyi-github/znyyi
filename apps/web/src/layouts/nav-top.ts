import { ref } from "vue";
import { useRoute } from "vue-router";
import useAppStore from "../store";

export const useNavTop = () => {
  const route = useRoute();
  const activeIndex = ref(route.path);
  const store = useAppStore();
  const userInfo = store.userInfo;

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

  return {
    userInfo,
    isShowLoginBox,
    activeIndex,
    data,
    loginBtnClick,
    closeLoginBox,
  };
};
