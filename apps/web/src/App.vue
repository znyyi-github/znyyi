<script setup lang="ts">
const size = "small";
const zIndex = 3000;
</script>

<template>
  <ElConfigProvider :size="size" :z-index="zIndex">
    <div>
      <RouterView />
    </div>
  </ElConfigProvider>
</template>

<style scoped></style>
