import { type ResponseData } from "@znyyi/shared";
import type { UserProfileResponse } from "@znyyi/shared";
import { instance } from "@/utils/request";

export async function getUserProfile() {
  const res =
    await instance.get<ResponseData<UserProfileResponse>>("/user/profile");
  return res.data;
}
