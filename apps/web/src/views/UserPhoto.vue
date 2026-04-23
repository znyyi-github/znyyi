<script setup lang="ts">
import { logout } from "@/api";
import jpgUrl from "../assets/default.jpg?url";
import { useUserStore } from "@/store/user";
import { useI18n } from "vue-i18n";
const store = useUserStore();
const { t } = useI18n();

const changeUserInfo = () => {};

const logoutFn = async () => {
  const { message } = await logout();
  localStorage.removeItem("access_token");
  store.updateIsLogin(false);

  ElMessage({
    message: t(message),
    type: "success",
    duration: 1000,
  });
};
</script>
<template>
  <div class="UserPhoto">
    <el-popover placement="bottom" trigger="hover" :teleported="false">
      <template #reference>
        <div
          class="img"
          :style="{
            backgroundImage: `url(${store.userInfo?.photo ? store.userInfo.photo : jpgUrl})`,
          }"
        ></div>
      </template>

      <div class="btn">
        <el-button type="primary" size="small" @click="changeUserInfo"
          >修改资料</el-button
        >
        <el-button type="danger" size="small" @click="logoutFn"
          >退出登录</el-button
        >
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.UserPhoto {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  cursor: pointer;

  .img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
}
.el-button {
  width: 100%;
  margin: 0;
}
</style>
