import { apiClient } from "@/services/api/client";
import { mockUser } from "@/constants/mock-data";
import type { UserProfile } from "@/types/domain";

export const userService = {
  async me(): Promise<UserProfile> {
    try {
      const { data } = await apiClient.get<UserProfile>("/api/me");
      return data;
    } catch {
      return mockUser;
    }
  }
};
