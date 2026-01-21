import { useMutation } from "@tanstack/react-query";
import { login } from "../useCases/login";
import type { LoginDto, AuthResponse } from "../types";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginDto>({
    mutationFn: login,
  });
};
