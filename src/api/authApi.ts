import client from "./client";
import type { LoginDto, AuthResponse } from "../features/auth/types";

export const authApi = {
  login: (payload: LoginDto) =>
    client.post<AuthResponse>("/auth/login", {
      email: payload.email,
      password: payload.password,
    }),

  logout: () => client.post("/auth/logout"),
};
