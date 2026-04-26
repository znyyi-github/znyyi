import { ref, onMounted } from "vue";
import { getArticleList } from "../../../api/article";

export interface ArticleItem {
  _id: string;
  title: string;
  date: string | number | Date;
  pv: number;
  des: string;
}

export function useArticleList() {
  const articleList = ref<ArticleItem[]>([]);
  const loading = ref(false);

  const fetchArticleList = async () => {
    loading.value = true;
    try {
      const res = await getArticleList();
      if (res.data && Array.isArray(res.data.data)) {
        articleList.value = res.data.data;
      }
    } catch (error) {
      console.error("Failed to fetch article list:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchArticleList();
  });

  const formatDate = (dateStr: string | number | Date) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  };

  return {
    articleList,
    loading,
    formatDate,
    fetchArticleList,
  };
}
