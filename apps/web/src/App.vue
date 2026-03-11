<script setup lang="ts">
import NavTop from "./layouts/NavTop.vue";
import { useI18nLoadStore } from "./store/i18n";

const size = "small";
const zIndex = 3000;
const i18nLoadStore = useI18nLoadStore();
</script>

<template>
  <ElConfigProvider :size="size" :z-index="zIndex">
    <template v-if="i18nLoadStore.i18nDataLoaded">
      <NavTop />
      <div class="main">
        <RouterView />
      </div>
    </template>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  margin: 60px auto 0;
  max-width: 1300px;
}
</style>
