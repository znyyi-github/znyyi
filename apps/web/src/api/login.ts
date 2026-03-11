import { type ResponseData } from "@znyyi/shared";
import type { LoginQuery, LoginResponse } from "@znyyi/shared";
import { instance } from "@/utils/request";
export async function login(
  query: LoginQuery,
): Promise<ResponseData<LoginResponse>> {
  const res = await instance.post("/auth/login", query);
  return res.data;
}
