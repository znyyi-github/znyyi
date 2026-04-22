<script setup lang="ts">
import Login from "@/views/Login.vue";
import NavTopUserPhoto from "../views/UserPhoto.vue";
import { useNavTop } from "./nav-top";

const {
  store,
  isShowLoginBox,
  activeIndex,
  data,
  loginBtnClick,
  closeLoginBox,
  showAppSide,
  currentLang,
  switchLang,
} = useNavTop();
</script>
<template>
  <div id="nav-top">
    <div class="inner-box">
      <div class="left-logo" @click.stop="showAppSide">
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
        <!-- <RouterLink class="backend-admin" to="/admin">{{
          $t("app.text.backendadmin")
        }}</RouterLink> -->
        <div class="lang-switch" @click="switchLang">
          <span class="lang-text">{{
            currentLang === "zh-cn" ? "EN" : "中"
          }}</span>
        </div>
        <div v-if="store.isLogin" class="user-info">
          <NavTopUserPhoto></NavTopUserPhoto>
        </div>
        <!-- 登录/注册 -->
        <template v-else>
          <el-button
            class="login-btn"
            @click="loginBtnClick"
            type="success"
            size="small"
          >
            {{ $t("app.text.login") }}
          </el-button>
        </template>
      </div>

      <Login @closeLoginBox="closeLoginBox" v-if="isShowLoginBox"></Login>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav-top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  box-shadow: 0 0 5px #777;
  background-color: #ffffff;
  @media screen and (max-width: 400px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .inner-box {
    width: 100%;
    max-width: 1300px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
.right-nav {
  display: flex;
  align-items: center;
  .lang-switch {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    transition: all 0.3s;
    &:hover {
      background-color: #f5f7fa;
      border-color: #409eff;
      .lang-text {
        color: #409eff;
      }
    }
    .lang-text {
      font-size: 10px;
      color: #409eff;
    }
  }
  .login-btn {
    margin-left: 12px;
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
  @media screen and (max-width: 500px) {
    width: 100px;
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
    display: inline-block;
    padding: 0px 10px;
    height: 40px;
    line-height: 40px;
    cursor: default;
    @media screen and (max-width: 800px) {
      font-size: 20px;
      cursor: pointer;
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
    margin: 0 14px 0 0;
    font-size: 11px;
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
</style>
