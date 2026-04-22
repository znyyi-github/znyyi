import { type ResponseData } from "@znyyi/shared";
import type { LoginQuery, LoginResponse } from "@znyyi/shared";
import { instance } from "@/utils/request";

export async function login(query: LoginQuery) {
  const res = await instance.post<ResponseData<LoginResponse>>(
    "/auth/login",
    query,
  );
  return res.data;
}

export async function logout() {
  const res = await instance.post<ResponseData<null>>("/auth/logout");
  return res.data;
}
