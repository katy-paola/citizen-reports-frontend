import { authApi } from "../../../api/authApi";

export const logout = async () => {
  await authApi.logout();
};
