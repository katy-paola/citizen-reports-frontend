import { tokenStorage } from "./utils/tokenStorage";

export const isAdminSession = () => {
  return Boolean(tokenStorage.get());
};
