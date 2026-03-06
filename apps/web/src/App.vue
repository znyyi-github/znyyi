<script setup lang="ts">
import NavTop from "./layouts/NavTop.vue";

const size = "small";
const zIndex = 3000;
</script>

<template>
  <ElConfigProvider :size="size" :z-index="zIndex">
    <div>
      <NavTop />
      <RouterView />
    </div>
  </ElConfigProvider>
</template>

<style lang="scss"></style>
