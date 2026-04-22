<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

useHead({
  title: "znyyi.fun",
  meta: [
    {
      name: "author",
      content: "znyyi",
    },
  ],
});

const { t } = useI18n();

const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: [
    { required: true, message: t("请输入姓名"), trigger: "blur" },
    { min: 2, max: 8, message: t("长度应为2到8位"), trigger: "blur" },
  ],
  email: [
    { required: true, message: t("请输入邮箱"), trigger: "blur" },
    {
      validator: (rule: any, value: string, callback: any) => {
        const reg = /^[^\s]+@[^\s]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(t("邮件格式不正确")));
        }
      },
      trigger: "blur",
    },
  ],
  message: [{ required: true, message: t("请输入留言内容"), trigger: "blur" }],
};

const contactFormRef = ref();

const submitForm = () => {
  contactFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // 这里应调用后端API发送邮件，暂用提示模拟
      ElMessage({
        message: t("发送成功！"),
        type: "success",
        duration: 1000,
      });
      resetForm();
    }
  });
};
const resetForm = () => {
  contactFormRef.value.resetFields();
};
</script>
<template>
  <div class="home">
    <!-- hello -->
    <div class="hello common">
      <p class="title">{{ t("index.hello_title") }}</p>
      <p class="des" v-html="t('index.hello_desc')"></p>
    </div>
    <!-- experience -->
    <div class="experience common">
      <p class="title">{{ t("index.experience_title") }}</p>
      <div class="experience-list">
        <!-- 个人博客项目 -->
        <div class="experience-item">
          <div class="exp-dot"></div>
          <div class="exp-header">
            <div class="exp-title-wrapper">
              <span class="exp-icon">📚</span>
              <p class="exp-title">{{ t("index.exp.project1.title") }}</p>
              <span class="exp-badge">{{ t("index.exp.project1.badge") }}</span>
            </div>
            <span class="exp-time">{{ t("index.exp.project1.time") }}</span>
          </div>
          <div class="exp-tag">{{ t("index.exp.project1.tag") }}</div>
          <div class="exp-content">
            <p class="exp-desc">{{ t("index.exp.project1.desc1") }}</p>
            <p class="exp-desc">{{ t("index.exp.project1.desc2") }}</p>
          </div>
        </div>
        <!-- 华为 -->
        <div class="experience-item">
          <div class="exp-dot"></div>
          <div class="exp-header">
            <div class="exp-title-wrapper">
              <span class="exp-icon">🏢</span>
              <p class="exp-title">{{ t("index.exp.huawei.title") }}</p>
            </div>
            <span class="exp-time">{{ t("index.exp.huawei.time") }}</span>
          </div>
          <div class="exp-tag">{{ t("index.exp.huawei.tag") }}</div>
          <div class="exp-content">
            <p class="exp-desc">{{ t("index.exp.huawei.desc1") }}</p>
            <p class="exp-desc">{{ t("index.exp.huawei.desc2") }}</p>
            <p class="exp-desc">{{ t("index.exp.huawei.desc3") }}</p>
            <p class="exp-desc">{{ t("index.exp.huawei.desc4") }}</p>
          </div>
        </div>
        <!-- ZYI Game -->
        <div class="experience-item">
          <div class="exp-dot"></div>
          <div class="exp-header">
            <div class="exp-title-wrapper">
              <span class="exp-icon">🎮</span>
              <p class="exp-title">{{ t("index.exp.game.title") }}</p>
            </div>
            <span class="exp-time">{{ t("index.exp.game.time") }}</span>
          </div>
          <div class="exp-tag">{{ t("index.exp.game.tag") }}</div>
          <div class="exp-content">
            <p class="exp-desc">{{ t("index.exp.game.desc1") }}</p>
            <p class="exp-desc">{{ t("index.exp.game.desc2") }}</p>
            <p class="exp-desc">{{ t("index.exp.game.desc3") }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- contact -->
    <div id="contact" class="contact common">
      <p class="title">{{ t("index.contact_title") }}</p>
      <p class="des">
        {{ t("index.contact_desc") }}
      </p>
      <el-form
        ref="contactFormRef"
        :model="contactForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="Your Name" prop="name">
          <el-input v-model="contactForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Your Email" prop="email">
          <el-input v-model="contactForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Your Message" prop="message">
          <el-input v-model="contactForm.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            t("app.text.send")
          }}</el-button>
          <el-button @click="resetForm">{{ t("app.text.reset") }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.el-form-item__content {
  line-height: 40px;
  height: 40px;
  font-size: 14px;
}
.home {
  flex: 1;
  .common {
    background: #fff;
    padding: 15px 15px 30px;
    margin-bottom: 10px;
    p.title {
      @media screen and (max-width: 380px) {
        font-size: 20px;
      }
      margin-bottom: 10px;
      font-size: 30px;
      letter-spacing: 3px;
      padding-top: 10px;
      font-family: "Quicksand";
      font-weight: 600;
    }
    p.des {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      font-family: "Quicksand";
    }
  }
  .hello {
    p.des {
      border-bottom: none;
      padding-bottom: 0px;
      margin-bottom: 0px;
    }
  }
  .experience {
    .experience-list {
      padding: 10px 25px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 33px;
        top: 20px;
        bottom: 20px;
        width: 2px;
        background: linear-gradient(
          to bottom,
          #bfe2e6 0%,
          #66afea 50%,
          #bfe2e6 100%
        );
        border-radius: 1px;
      }
      .experience-item {
        position: relative;
        margin-bottom: 35px;
        padding-left: 45px;
        transition: transform 0.3s ease;
        &:hover {
          .exp-dot {
            background: #667eea;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.6);
            transform: scale(1.2);
          }
        }
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .exp-dot {
          position: absolute;
          left: 0px;
          top: 6px;
          width: 14px;
          height: 14px;
          background: #bfe2e6;
          border: 3px solid #fff;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 10px;
          .exp-title-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 200px;
            .exp-icon {
              font-size: 22px;
              line-height: 1;
            }
            .exp-title {
              font-size: 18px;
              font-weight: 600;
              color: #333;
              font-family: "Quicksand";
              margin: 0;
              @media screen and (max-width: 380px) {
                font-size: 16px;
              }
            }
            .exp-badge {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #fff;
              padding: 2px 10px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              font-family: "Quicksand";
              letter-spacing: 1px;
            }
          }
          .exp-time {
            color: #999;
            font-size: 13px;
            font-family: "Quicksand";
            white-space: nowrap;
            @media screen and (max-width: 380px) {
              font-size: 12px;
            }
          }
        }
        .exp-tag {
          display: inline-block;
          background: #f0f7f8;
          border-left: 3px solid #bfe2e6;
          color: #555;
          padding: 4px 12px;
          border-radius: 0 4px 4px 0;
          font-size: 13px;
          font-family: "Quicksand";
          margin-bottom: 12px;
          font-weight: 500;
        }
        .exp-content {
          .exp-desc {
            color: #666;
            font-size: 14px;
            line-height: 26px;
            margin-bottom: 8px;
            font-family: "Quicksand";
            padding-left: 16px;
            position: relative;
            &:last-child {
              margin-bottom: 0;
            }
            &::before {
              content: "•";
              position: absolute;
              left: 0;
              color: #bfe2e6;
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .contact {
    .el-form {
      font-family: "Quicksand";
      padding: 0 40px;
      .el-form-item {
        flex-direction: column;
        .el-button {
          display: inline-block;
          width: 95px;
          height: 40px;
          margin-top: 20px;
          border: 0;
          border-radius: 20px;
          box-shadow: 0 0 0 #bbb;
          background-color: #bfe2e6;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 2px;
          font-family: "Quicksand", "sans-serif";
          color: #000;
          cursor: pointer;
          transition: box-shadow 0.3s;
          &:last-child {
            background: rgb(222, 224, 224);
          }
          &:hover {
            box-shadow: 0 3px 5px #bbb;
          }
        }
      }
    }
  }
}
</style>
