import { instance } from "../utils/request";

export function getArticleList() {
  return instance.get("/art/all");
}

export function getArticleDetail(id: string) {
  return instance.get(`/art/detail/${id}`);
}

export function getArticleMarkdown(id: string) {
  return instance.get(`/art/md/${id}`);
}
