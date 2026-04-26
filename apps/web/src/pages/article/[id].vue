<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { getArticleDetail, getArticleMarkdown } from "@/api/article";
import MarkdownIt from "markdown-it";
import "github-markdown-css/github-markdown-light.css";

const route = useRoute();
const md = new MarkdownIt();

interface ArticleData {
  _id: string;
  title: string;
  md?: string;
  date: number;
  pv: number;
}

interface ArticleMeta {
  [key: string]: any;
}

const article = ref<ArticleData | null>(null);
const articleMeta = ref<ArticleMeta | null>(null);
const renderedContent = ref("");

useHead({
  title: () =>
    article.value ? `${article.value.title} - znyyi.fun` : "加载中...",
});

const fetchDetail = async () => {
  const id = route.params.id as string;

  try {
    const res = await getArticleDetail(id);
    if (res.data && res.data.code === "0") {
      article.value = res.data.data;

      if (article.value) {
        console.log("Article data:", article.value);
        const mdRes = await getArticleMarkdown(id);
        const { markdown, meta } = mdRes.data.data;
        renderedContent.value = md.render(markdown);
        articleMeta.value = meta || null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div id="ArticleDetail" class="article-container">
    <div v-if="article" class="article-content-wrapper">
      <div class="article-meta" v-if="articleMeta">
        <p class="article-description" v-if="articleMeta.description">
          {{ articleMeta.description }}
        </p>
        <div class="article-meta-fields">
          <span v-if="articleMeta.author">作者：{{ articleMeta.author }}</span>
          <span v-if="articleMeta.category"
            >分类：{{ articleMeta.category }}</span
          >
          <span v-if="articleMeta.tags"
            >标签：{{
              Array.isArray(articleMeta.tags)
                ? articleMeta.tags.join(" / ")
                : articleMeta.tags
            }}</span
          >
          <span v-if="articleMeta.date !== undefined"
            >更新日期：{{
              new Date(articleMeta.date).toLocaleDateString()
            }}</span
          >
        </div>
      </div>
      <div class="article-info">
        <span>发布于：{{ new Date(article.date).toLocaleString() }}</span>
        <span>浏览量：{{ article.pv }}</span>
      </div>
      <div class="markdown-body" v-html="renderedContent"></div>
    </div>
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<style lang="scss" scoped>
.article-container {
  flex: 1;
  background-color: #fff;
  color: #333;
  color-scheme: light;
  padding: 30px;
  box-shadow: 0 0 4px #ddd;
  min-height: 500px;
}

.article-content-wrapper {
  color: #333;
}

.article-meta {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
}

.article-description {
  margin-bottom: 12px;
  color: #555;
}

.article-meta-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.article-meta-fields span {
  color: #888;
}

.article-info {
  margin-bottom: 25px;
  color: #999;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

  span {
    margin-right: 20px;
  }
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0;
  background-color: #fff;
  color: #333;
  color-scheme: light;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6,
.markdown-body p,
.markdown-body li,
.markdown-body blockquote,
.markdown-body pre,
.markdown-body code,
.markdown-body td,
.markdown-body th {
  color: #333;
}

.markdown-body a {
  color: #096dd9;
}

.markdown-body pre {
  background-color: #f6f8fa;
  border: 1px solid #dce4ea;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  background-image: linear-gradient(
    transparent 0,
    transparent 1.8em,
    rgba(238, 241, 246, 0.7) 1.8em,
    rgba(238, 241, 246, 0.7) 3.6em
  );
  background-size: 100% 3.6em;
}

.markdown-body code {
  background-color: #f6f8fa;
}

@media (max-width: 767px) {
  .article-container {
    padding: 15px;
  }
}
</style>
