import { api } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Backend espera JSON con { email, password } y devuelve { user, access_token, token_type }
    const tokenData = await api.post<LoginResponse>("/api/v1/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    // Si por alguna razón el backend no incluye `user`, lo consultamos.
    if (!tokenData.user) {
      const user = await api.get<User>("/api/v1/auth/me", {
        token: tokenData.access_token,
      });
      return { ...tokenData, user };
    }

    return tokenData;
  },

  register: async (data: RegisterData): Promise<User> => {
    return api.post<User>("/api/v1/auth/register", data);
  },

  logout: async (token: string): Promise<void> => {
    return api.post("/api/v1/auth/logout", {}, { token });
  },

  verifyToken: async (token: string): Promise<User> => {
    return api.get<User>("/api/v1/auth/verify", { token });
  },

  getCurrentUser: async (token: string): Promise<User> => {
    return api.get<User>("/api/v1/auth/me", { token });
  },
};
