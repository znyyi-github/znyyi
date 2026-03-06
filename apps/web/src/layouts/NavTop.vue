<script setup lang="ts">
import Login from "@/views/Login.vue";
import UserPhoto from "@/components/UserPhoto.vue";

import { useNavTop } from "./nav-top";
const {
  userInfo,
  isShowLoginBox,
  activeIndex,
  data,
  loginBtnClick,
  closeLoginBox,
} = useNavTop();
</script>
<template>
  <div id="nav-top">
    <div class="left-logo">
      <span>znyyi.fun</span>
    </div>
    <div class="center-nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item
          v-for="item in data"
          :key="item.url"
          :index="item.url"
          :route="item.url"
        >
          <span class="nav-item">{{ $t(item.name) }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-nav">
      <RouterLink class="backend-admin" to="/admin">后台管理</RouterLink>

      <div v-if="userInfo.user" class="user-info">
        <UserPhoto></UserPhoto>
      </div>
      <!-- 登录/注册 -->
      <el-button
        v-else
        class="login-btn"
        @click="loginBtnClick"
        type="success"
        size="small"
      >
        {{ $t("app.text.login") }}
      </el-button>
    </div>

    <Login @closeLoginBox="closeLoginBox" v-if="isShowLoginBox"></Login>
  </div>
</template>

<style lang="scss" scoped>
#nav-top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  z-index: 99;
  box-shadow: 0 0 5px #777;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 400px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.center-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.el-menu {
  border-bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 500px;
  @media screen and (max-width: 800px) {
    width: 200px;
  }
  @media screen and (max-width: 600px) {
    width: 150px;
  }
}
.el-menu-item {
  --el-menu-text-color: #777;
  &.is-active {
    background-color: transparent !important;
  }
  &:hover {
    background-color: transparent !important;
  }
}
:deep(.el-sub-menu) {
  .el-sub-menu__title {
    color: #777;
  }
}
.left-logo {
  span {
    font-family: "Pacifico";
    font-size: 30px;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    display: inline-block;
    padding: 0px 10px;
    height: 40px;
    line-height: 40px;
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
}
.right-nav {
  height: 100%;
  display: flex;
  padding: 0 10px 0 0;
  justify-content: flex-end;
  align-items: center;

  .backend-admin {
    padding: 0 30px 0 0;
    font-size: 13px;
  }
}
</style>
