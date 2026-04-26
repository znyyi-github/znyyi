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

interface ExperienceItem {
  key: string;
  icon: string;
  title: string;
  badge?: string;
  time: string;
  tag: string;
  descs: string[];
}

const experienceList: ExperienceItem[] = [
  {
    key: "project1",
    icon: "📚",
    title: "index.exp.project1.title",
    badge: "index.exp.project1.badge",
    time: "index.exp.project1.time",
    tag: "index.exp.project1.tag",
    descs: ["index.exp.project1.desc1", "index.exp.project1.desc2"],
  },
  {
    key: "huawei",
    icon: "🏢",
    title: "index.exp.huawei.title",
    time: "index.exp.huawei.time",
    tag: "index.exp.huawei.tag",
    descs: [
      "index.exp.huawei.desc1",
      "index.exp.huawei.desc2",
      "index.exp.huawei.desc3",
      "index.exp.huawei.desc4",
    ],
  },
  {
    key: "game",
    icon: "🎮",
    title: "index.exp.game.title",
    time: "index.exp.game.time",
    tag: "index.exp.game.tag",
    descs: [
      "index.exp.game.desc1",
      "index.exp.game.desc2",
      "index.exp.game.desc3",
    ],
  },
];

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
        <div
          class="experience-item"
          v-for="exp in experienceList"
          :key="exp.key"
        >
          <div class="exp-dot"></div>
          <div class="exp-header">
            <div class="exp-title-wrapper">
              <span class="exp-icon">{{ exp.icon }}</span>
              <p class="exp-title">{{ t(exp.title) }}</p>
              <span v-if="exp.badge" class="exp-badge">{{ t(exp.badge) }}</span>
            </div>
            <span class="exp-time">{{ t(exp.time) }}</span>
          </div>
          <div class="exp-tag">{{ t(exp.tag) }}</div>
          <div class="exp-content">
            <p v-for="(desc, dIdx) in exp.descs" :key="dIdx" class="exp-desc">
              {{ t(desc) }}
            </p>
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
      margin-bottom: 10px;
      font-size: 30px;
      letter-spacing: 3px;
      padding-top: 10px;
      font-family: "Quicksand";
      font-weight: 600;
      @media screen and (max-width: 600px) {
        font-size: 20px;
      }
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
        left: 24px;
        top: 28px;
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
        margin: 0 0 24px 28px;
        padding: 20px 24px;
        padding-left: 40px;
        background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
        border-radius: 12px;
        border: 1px solid rgba(191, 226, 230, 0.2);
        box-shadow:
          0 4px 16px rgba(102, 175, 233, 0.08),
          0 2px 8px rgba(0, 0, 0, 0.04);
        transition: all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
        opacity: 0;
        transform: translateY(20px);
        animation: cardSlideIn 0.6s ease forwards;

        &:nth-child(1) {
          animation-delay: 0.1s;
        }
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        &:nth-child(3) {
          animation-delay: 0.3s;
        }

        &:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 12px 32px rgba(102, 175, 233, 0.18),
            0 4px 16px rgba(102, 126, 234, 0.12);
          border-color: rgba(102, 175, 233, 0.4);
          background: linear-gradient(135deg, #ffffff 0%, #f0f7f8 100%);

          .exp-dot {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.6);
            transform: scale(1.3);
          }

          .exp-icon {
            transform: scale(1.15) rotate(5deg);
          }

          .exp-badge {
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          }

          .exp-tag {
            background: linear-gradient(90deg, #e0f4f5 0%, #d0eef0 100%);
            border-left-width: 4px;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        .exp-dot {
          position: absolute;
          left: -38px;
          top: 0px;
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #bfe2e6 0%, #a0d8de 100%);
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(102, 175, 233, 0.25);
          transition: all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
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
              transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
              display: inline-block;
            }
            .exp-title {
              font-size: 18px;
              font-weight: 600;
              color: #333;
              font-family: "Quicksand";
              margin: 0;
              @media screen and (max-width: 600px) {
                font-size: 16px;
              }
            }
            .exp-badge {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #fff;
              padding: 3px 10px;
              border-radius: 14px;
              font-size: 12px;
              font-weight: 600;
              font-family: "Quicksand";
              letter-spacing: 1px;
              box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
              transition: all 0.3s ease;
              @media screen and (max-width: 600px) {
                font-size: 10px;
                padding: 2px 8px;
              }
            }
          }
          .exp-time {
            color: #999;
            font-size: 13px;
            font-family: "Quicksand";
            white-space: nowrap;
            @media screen and (max-width: 600px) {
              font-size: 12px;
            }
          }
        }
        .exp-tag {
          display: inline-block;
          background: #f0f7f8;
          border-left: 3px solid #bfe2e6;
          color: #555;
          padding: 5px 14px;
          border-radius: 0 6px 6px 0;
          font-size: 13px;
          font-family: "Quicksand";
          margin-bottom: 12px;
          font-weight: 500;
          transition: all 0.16s ease;
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
              animation: bulletFade 0.5s ease forwards;
              opacity: 0;
            }

            &:nth-child(1)::before {
              animation-delay: 0.2s;
            }
            &:nth-child(2)::before {
              animation-delay: 0.3s;
            }
            &:nth-child(3)::before {
              animation-delay: 0.4s;
            }
            &:nth-child(4)::before {
              animation-delay: 0.5s;
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

/* 卡片进入动画 */
@keyframes cardSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 点状指示器脉动动画 */
@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1.3);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
}

/* 项目符号渐入动画 */
@keyframes bulletFade {
  0% {
    opacity: 0;
    transform: translateX(-5px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .experience .experience-list {
    padding: 8px 16px;

    .experience-item {
      padding: 16px 18px;
      padding-left: 32px;
      margin-bottom: 16px;

      &:hover {
        transform: translateY(-4px) scale(1.01);
      }

      .exp-dot {
        left: -4px;
        top: 18px;
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
