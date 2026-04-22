<script setup lang="ts">
import { getUserProfile } from "./api";
import AppSide from "./layouts/AppSide.vue";
import NavTop from "./layouts/NavTop.vue";
import { useI18nLoadStore } from "./store/i18n";
import { useUserStore } from "./store/user";
import { eventBus } from "./utils/event-bus";

const size = "small";
const zIndex = 3000;
const i18nLoadStore = useI18nLoadStore();
const store = useUserStore();

if (store.isLogin) {
  getUserProfile().then((res) => {
    store.updateUserInfo(res.data!);
    store.updateIsLogin(true);
  });
}
eventBus.on("http401", () => {
  store.updateIsLogin(false);
});
</script>

<template>
  <ElConfigProvider :size="size" :z-index="zIndex">
    <template v-if="i18nLoadStore.i18nDataLoaded">
      <!-- 导航栏 -->
      <NavTop />
      <div class="main">
        <!-- 侧边栏 -->
        <AppSide></AppSide>

        <RouterView />
      </div>
    </template>
  </ElConfigProvider>
</template>

<style lang="scss">
body {
  background:    /* 双背景图片 */
    url("./assets/img/bg/bg-left.png") no-repeat left 50px,
    url("./assets/img/bg/bg-right.png") no-repeat right 50px;
  background-color: #f2f2f2;
}
</style>
<style lang="scss" scoped>
.main {
  display: flex;
  min-height: 100vh;
  margin: 60px auto 0;
  max-width: 1300px;
}
</style>
