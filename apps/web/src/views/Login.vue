<script setup lang="ts">
import { useLogin, type LoginEmit } from "./login";

// 事件
const emit = defineEmits<LoginEmit>();

const {
  closeLoginBox,
  activeName,
  loginForm,
  rules,
  loginSubmit,
  resetForm,
  regForm,
  regSubmit,
} = useLogin(emit);
</script>
<template>
  <div id="login" @click="closeLoginBox">
    <div class="main" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('app.text.user_login')" name="login">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-width="auto"
          >
            <el-form-item
              style="margin-top: 20px"
              :label="$t('app.text.user_name')"
              prop="name"
            >
              <el-input size="default" v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item
              style="margin-top: 30px"
              :label="$t('app.text.user_pwd')"
              prop="pwd"
            >
              <el-input
                size="default"
                v-model="loginForm.pwd"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button type="primary" size="default" @click="loginSubmit()">
                {{ $t("app.text.confirm_login") }}
              </el-button>
              <el-button @click="resetForm('loginForm')" size="default">
                {{ $t("app.text.reset") }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane :label="$t('app.text.user_register')" name="register">
          <el-form
            ref="regFormRef"
            :model="regForm"
            :rules="rules"
            label-width="auto"
          >
            <el-form-item
              style="margin-top: 20px"
              :label="$t('app.text.user_name')"
              prop="name"
            >
              <el-input size="default" v-model="regForm.name"></el-input>
            </el-form-item>
            <el-form-item
              style="margin-top: 30px"
              :label="$t('app.text.user_pwd')"
              prop="pwd"
            >
              <el-input
                size="default"
                v-model="regForm.pwd"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item
              style="margin-top: 30px"
              :label="$t('app.text.regain_pwd')"
              prop="repwd"
            >
              <el-input
                size="default"
                v-model="regForm.repwd"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="default" @click="regSubmit()">
                {{ $t("app.text.confirm_register") }}
              </el-button>
              <el-button @click="resetForm('regForm')" size="default">
                {{ $t("app.text.reset") }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .main {
    width: 300px;
    // height: 300px;
    padding: 10px 30px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    :deep(.el-form-item__content) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
