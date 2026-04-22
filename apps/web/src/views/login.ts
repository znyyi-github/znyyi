import { ref, useTemplateRef } from "vue";
import { login } from "../api";
import { useUserStore } from "../store/user";
import { useI18n } from "vue-i18n";

export interface LoginEmit {
  closeLoginBox: [];
}

export const useLogin = (emit: ReturnType<typeof defineEmits>) => {
  const closeLoginBox = () => {
    emit("closeLoginBox");
  };

  const activeName = ref("login");
  const loginForm = ref({ name: "", pwd: "" });
  const regForm = ref({ name: "", pwd: "", repwd: "" });
  const rules = {};
  const store = useUserStore();
  const { t } = useI18n();

  const loginSubmit = async () => {
    const res = await login({
      user: loginForm.value.name,
      pwd: loginForm.value.pwd,
    });

    ElMessage({
      message: t(res.message),
      type: "success",
      duration: 1000,
    });
    closeLoginBox();

    store.updateUserInfo(res.data!);
    store.updateIsLogin(true); // 设置isLogin
  };
  const regSubmit = async () => {};

  const formRefs = useFormRefs();
  const resetForm = (formName: "loginForm" | "regForm") => {
    (formRefs[formName]?.value as any).resetFields();
  };
  return {
    closeLoginBox,
    activeName,
    loginForm,
    regForm,
    rules,
    loginSubmit,
    regSubmit,
    resetForm,
  };
};

export const useFormRefs = () => {
  return Object.fromEntries(
    ["loginForm", "regForm"].map((formName) => {
      return [formName, useTemplateRef(formName + "Ref")];
    }),
  );
};
