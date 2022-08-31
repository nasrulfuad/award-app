import axios from "axios";
import { TAuth } from "types/api/auth";
import { TFormLogin } from "types/page/auth.page";

export const loginApi = async (
  data: TFormLogin
): Promise<API.IResponseApi<TAuth>> => {
  try {
    const response = await axios.post("/users/login", data);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
