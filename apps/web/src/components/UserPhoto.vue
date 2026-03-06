<script setup lang="ts">
useAppStore();
import useAppStore from "@/store";
const store = useAppStore();
const userInfo = store.userInfo;

const changeUserInfo = () => {};
const logout = () => {};
</script>
<template>
  <div id="UserPhoto">
    <el-popover
      placement="bottom"
      :width="100"
      trigger="hover"
      popper-class="userPhotoPopper"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <div
          class="img"
          :style="{
            backgroundImage: `url(/${userInfo.photo})`,
          }"
        ></div>
      </template>

      <!-- hover之后弹框中出现的内容 -->
      <div class="btn">
        <!-- <el-button type="primary" size="small" @click="changeUserInfo"
          >修改资料</el-button
        > -->
        <el-button type="danger" size="small" @click="logout"
          >退出登录</el-button
        >
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
#UserPhoto {
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
.btn {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-button {
    margin: 0px;
  }
}
</style>
