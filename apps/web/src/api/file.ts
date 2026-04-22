import { type ResponseData } from "@znyyi/shared";
import { instance } from "@/utils/request";

export async function downloadCv() {
  const res = await instance.get<ResponseData<null>>("/file/cv");
  return res.data;
}
