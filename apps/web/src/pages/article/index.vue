<script setup lang="ts">
import { useArticleList } from "./hooks/useArticleList";

const { articleList, formatDate } = useArticleList();
</script>

<template>
  <div id="Article">
    <article v-for="(item, index) in articleList" :key="index">
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
    </article>
  </div>
</template>

<style lang="scss" scoped>
#Article {
  flex: 1;
  article {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand";

    .title {
      @media screen and (max-width: 380px) {
        font-size: 18px;
      }
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 5px;
      padding-left: 5px;
      width: 80%;
      text-transform: uppercase;
      font-weight: bold;
    }

    .time {
      @media screen and (max-width: 380px) {
        right: 4px;
        width: 65px;
      }
      position: absolute;
      top: 2px;
      right: 10px;
      width: 80px;

      .date {
        @media screen and (max-width: 380px) {
          font-size: 30px;
        }
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
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
      display: flex;
      width: 100%;
      min-height: 50px;
      padding-top: 10px;

      .des {
        box-sizing: border-box;
        width: 100%;
        color: rgb(65, 65, 65);
      }
    }

    .r-b {
      position: absolute;
      right: 10px;
      bottom: 20px;
      p {
        position: relative;
        top: -10px;
        color: #aaa;
        font-size: 12px;
      }
      a {
        padding: 10px 20px;
        background-color: #409eff;
        color: #fff;
        transition: opacity 0.3s;
        text-decoration: none;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
