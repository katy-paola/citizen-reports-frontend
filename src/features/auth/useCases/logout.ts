import { tokenStorage } from "../utils/tokenStorage";

export const logout = () => {
  tokenStorage.clear();
};
