import { useMutation } from "@tanstack/react-query";
import { login } from "../useCases/login";
import type { LoginDto, AuthResponse } from "../types";
import { tokenStorage } from "../utils/tokenStorage";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.set(data.access_token);
    },
  });
};
