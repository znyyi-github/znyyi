import type { LoginQuery } from "@znyyi/shared";
import { instance } from "@/utils/request";

export async function login(query: LoginQuery) {
  const res = await instance.post("/auth/login", query);
  return res.data;
}
