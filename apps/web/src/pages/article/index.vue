<script setup lang="ts">
import { useArticleList } from "./hooks/useArticleList";

const { articleList, formatDate } = useArticleList();
</script>

<template>
  <div class="article-list">
    <div
      class="article"
      v-for="(item, index) in articleList"
      :key="index"
      :style="{ '--article-index': index }"
    >
      <p class="title">{{ item.title }}</p>
      <div class="time">
        <p class="date">{{ formatDate(item.date).day }}</p>
        <p class="m-y">
          <span>{{ formatDate(item.date).month }}月</span>
          <span>{{ formatDate(item.date).year }}</span>
        </p>
      </div>
      <div class="show">
        <div class="des">{{ item.des }}</div>
      </div>
      <div class="r-b">
        <p>浏览量：{{ item.pv }}</p>
        <router-link :to="`/article/${item._id}`">阅读全文</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  flex: 1;
  .article {
    border-radius: 12px;
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "title time"
      "show show"
      "meta meta";
    gap: 4px 16px;
    align-items: start;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 6px 10px rgba(24, 36, 28, 0.05);
    padding: 25px 20px 20px;
    background-color: #fff;
    font-family: "Quicksand";
    overflow: hidden;
    transform: translateY(18px);
    opacity: 0;
    animation: articleEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(var(--article-index) * 70ms);
    transition:
      transform 0.28s ease,
      box-shadow 0.28s ease,
      border-color 0.28s ease;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(99, 162, 210, 0.18) 55%,
        transparent 100%
      );
      transform: translateX(-110%);
      transition: transform 0.7s ease;
    }

    &:hover {
      transform: translateY(-4px);

      &::after {
        transform: translateX(110%);
      }

      .title {
        border-left-color: #59b784;
      }

      .time .date {
        transform: scale(1.04);
      }
    }

    .title {
      @media screen and (max-width: 380px) {
        font-size: 18px;
      }
      grid-area: title;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 5px;
      padding-left: 5px;
      width: 100%;
      text-transform: uppercase;
      font-weight: bold;
      transition:
        color 0.25s ease,
        border-left-color 0.25s ease;
    }

    .time {
      grid-area: time;
      width: 80px;

      .date {
        @media screen and (max-width: 380px) {
          font-size: 30px;
        }
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
        height: 20px;
        line-height: 20px;
        transition: transform 0.25s ease;
      }

      .m-y {
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          float: left;
        }
        span:nth-of-type(2) {
          float: right;
        }
      }
    }

    .show {
      grid-area: show;
      display: flex;
      width: 100%;

      .des {
        padding-bottom: 2px;
        box-sizing: border-box;
        width: 100%;
        color: rgb(65, 65, 65);
      }
    }

    .r-b {
      grid-area: meta;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      p {
        margin: 0;
        color: #aaa;
        font-size: 12px;
      }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        margin-top: 2px;

        border-radius: 999px;
        background-color: #409eff;
        color: #fff;
        transition:
          opacity 0.25s ease,
          transform 0.25s ease,
          box-shadow 0.25s ease;
        text-decoration: none;
        box-shadow: 0 8px 16px rgba(64, 158, 255, 0.28);
        cursor: pointer;
        &:hover {
          opacity: 0.8;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(64, 158, 255, 0.34);
        }
      }
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas:
        "title time"
        "show"
        "meta";
      .time {
        width: 70px;
        justify-self: end;

        .date {
          font-size: 34px;
        }

        .m-y {
          font-size: 13px;
        }
      }

      .r-b {
        flex-wrap: wrap;
      }
    }
  }
}

@keyframes articleEnter {
  from {
    transform: translateY(18px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-list .article {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
    transition: none !important;
  }

  .article-list .article::after,
  .article-list .article .title,
  .article-list .article .time .date,
  .article-list .article .r-b a {
    transition: none !important;
  }
}
</style>
