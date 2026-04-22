<script setup lang="ts"></script>
<template>
  <div class="personal">
    <div class="top clear">
      <div class="img"></div>
      <div class="name">
        <p class="p1">ZNYYI</p>
        <p class="p2">{{ $t("personal.web_developer") }}</p>
      </div>
      <div class="contact">
        <a
          href="javascript:void(0)"
          :title="$t('personal.not_open')"
          class="iconfont icon-github"
        ></a>
        <a
          href="javascript:void(0)"
          :title="$t('personal.not_open')"
          class="iconfont icon-tubiaozhizuo-"
        ></a>
        <a
          href="javascript:void(0)"
          :title="$t('personal.not_open')"
          class="iconfont icon-QQ"
        ></a>
        <el-popover placement="bottom" :trigger="['click', 'hover']">
          <template #reference>
            <a class="iconfont icon-weixin"></a>
          </template>
          <img
            class="weixin"
            src="../assets/img/personal/weixin.png"
            width="100"
            height="100"
            alt="微信二维码"
          />
        </el-popover>
      </div>
    </div>
    <div class="bottom">
      <a :href="`/api/file/cv`">{{ $t("personal.download_cv") }}</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.personal {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;

  .top {
    width: 100%;
    background: #bfe2e6;
    .img {
      float: left;
      width: 60px;
      height: 60px;
      margin-top: 20px;
      margin-left: 30px;
      border-radius: 50%;
      border: 2px solid #fff;
      background: url(../assets/img/personal/znyyi.png) no-repeat;
      background-size: 110%;
      background-position: -3px -5px;
    }
    .name {
      float: right;
      margin-top: 29px;
      margin-right: 30px;
      .p1 {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 5px;
      }
      .p2 {
        font-family: "Quicksand";
        color: #555;
        font-weight: 700;
        letter-spacing: 3px;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    .contact {
      clear: both;
      padding: 15px 0;
      display: flex;
      justify-content: space-around;
      a {
        display: block;
        font-size: 20px;
        color: #525252;
        cursor: pointer;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 15px 0;
    background: #fff;
    a {
      display: block;
      width: 65%;
      height: 40px;
      border-radius: 23px;
      margin: 0 auto;
      box-shadow: 0 0 0 #888;
      font-family: "Quicksand";
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      font-weight: 700;
      color: #000;
      letter-spacing: 1px;
      background-color: #bfe2e6;
      transition: box-shadow 0.3s;
      &:hover {
        box-shadow: 0 2px 10px #888;
      }
    }
  }
}
.weixin {
  display: block;
  margin: 0 auto;
}
</style>
