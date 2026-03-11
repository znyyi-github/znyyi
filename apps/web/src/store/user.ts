import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const startUserHealthCheck = () => {};
  const stopUserHealthCheck = () => {};
});

// 开启轮询、终止轮询、页面是否需要登录状态、401处理
