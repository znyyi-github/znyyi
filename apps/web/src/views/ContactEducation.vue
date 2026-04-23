<script setup lang="ts"></script>
<template>
  <div class="contact-edu">
    <p>{{ $t("contact_edu.title") }}</p>

    <ul class="contact-list">
      <li>
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" class="icon">
            <path
              fill="currentColor"
              d="M6.6 10.2a15.05 15.05 0 006.2 6.2l1.8-1.8a1 1 0 011.1-.2c1.2.5 2.6.8 4 .8a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h2.5a1 1 0 011 1c0 1.4.3 2.8.8 4a1 1 0 01-.2 1.1L6.6 10.2z"
            />
          </svg>
        </div>
        <span class="text">18896131332</span>
      </li>

      <li>
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" class="icon">
            <path
              fill="currentColor"
              d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </div>
        <span class="text">980416540@qq.com</span>
      </li>

      <li>
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" class="icon">
            <path
              fill="currentColor"
              d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"
            />
          </svg>
        </div>
        <span class="text">{{ $t("contact_edu.location") }}</span>
      </li>

      <li class="education">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" class="icon">
            <path
              fill="currentColor"
              d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM11 13.5L3.5 9 11 4.5 18.5 9 11 13.5zM6 12v2l5 3 5-3v-2L11 15l-5-3z"
            />
          </svg>
        </div>
        <div class="text">
          <div class="school">{{ $t("contact_edu.school") }}</div>
          <div class="major">{{ $t("contact_edu.major") }}</div>
          <div class="time">2017.09 - 2021.06</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.contact-edu {
  font-family: Quicksand;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  padding: 18px 20px;
  margin-bottom: 10px;

  p {
    line-height: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    font-size: 16px;
    margin: 0 0 10px 0;
    font-weight: 600;
  }

  .contact-list {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      padding: 6px 0;

      .icon-wrap {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #f3fbfb;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        box-shadow: none;
      }

      .text {
        color: #000000;
        font-size: 14px;
      }
    }
    .education {
      .school {
        font-weight: 600;
      }
      .major {
        color: #6b7a7a;
        font-size: 14px;
      }
      .time {
        color: #9aa9a9;
        font-size: 13px;
      }
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    color: #2aa7a0;
  }
}
</style>
·
