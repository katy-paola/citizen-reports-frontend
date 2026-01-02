import { authApi } from "../../../api/authApi";
import type { LoginDto } from "../types";

export const login = async (payload: LoginDto) => {
  const { data } = await authApi.login(payload);
  return data;
};
