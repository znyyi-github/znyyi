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
  <div id="LoginBox" @click="closeLoginBox">
    <div class="main" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('app.text.user_login')" name="login">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item
              style="margin-top: 20px"
              :label="$t('app.text.user_name')"
              prop="name"
            >
              <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item
              style="margin-top: 30px"
              :label="$t('app.text.user_pwd')"
              prop="pwd"
            >
              <el-input v-model="loginForm.pwd" type="password"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button type="primary" @click="loginSubmit()">
                {{ $t("app.text.confirm_login") }}
              </el-button>
              <el-button @click="resetForm('loginForm')">
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
            label-width="90px"
          >
            <el-form-item :label="$t('app.text.user_name')" prop="name">
              <el-input v-model="regForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('app.text.user_pwd')" prop="pwd">
              <el-input v-model="regForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('app.text.regain_pwd')" prop="repwd">
              <el-input v-model="regForm.repwd" type="password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="regSubmit()">
                {{ $t("app.text.confirm_register") }}
              </el-button>
              <el-button @click="resetForm('regForm')">
                {{ $t("app.text.reset") }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped></style>
