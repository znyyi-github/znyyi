<script setup lang="ts">
import Personal from "@/views/Personal.vue";
import ContactEducation from "@/views/ContactEducation.vue";
import SkillsMap from "@/views/SkillsMap.vue";
import { useAppSide } from "./app-side";

const { store } = useAppSide();
</script>
<template>
  <div
    class="AppSide"
    :class="{
      showAppSide: store.isShowAppSide,
      closeAppSide: store.isCloseAppSide,
    }"
  >
    <div class="innerbox" @click.stop>
      <!-- 个人信息 -->
      <Personal></Personal>

      <!-- 用于固定定位 -->
      <div :class="{ fixed: store.ifFixed }">
        <!-- 联系与教育 -->
        <ContactEducation />
        <!-- 技能图谱 -->
        <SkillsMap />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$h: calc(calc(100%) - 50px);
.AppSide {
  left: 0;
  transition: left 0.2s;
  width: 270px;
  min-width: 270px;
  margin-right: 8px;
  z-index: 6;
  @media screen and (max-width: 800px) {
    //当屏幕宽度小于等于800px时
    position: absolute;
    left: -270px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  div.fixed {
    position: fixed;
    top: 61px;
    width: 270px;
    z-index: 2;
  }
}
.showAppSide {
  @media screen and (max-width: 800px) {
    position: fixed !important;
    left: 0 !important;
    top: 50px;
    overflow-y: auto;
    height: $h;
    div {
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }
}
.closeAppSide {
  @media screen and (max-width: 800px) {
    position: fixed !important;
    left: -270px !important;
    top: 50px;
    overflow-y: auto;
    height: $h;
    div {
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }
}
</style>
