export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: "ADMIN";
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}
