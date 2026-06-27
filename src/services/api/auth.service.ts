import { apiClient } from "@/services/api/client";
import type { UserProfile } from "@/types/domain";

interface AuthResponse {
  user: UserProfile;
  access_token: string;
  refresh_token: string;
}

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  school: string;
  faculty: string;
  department: string;
  level?: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/register", {
      full_name: input.fullName,
      email: input.email,
      password: input.password,
      university: input.school,
      faculty: input.faculty,
      department: input.department,
      level: input.level ?? "300"
    });
    return data;
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/api/auth/login", { email, password });
    return data;
  }
};
