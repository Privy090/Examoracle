import { apiClient } from "@/services/api/client";
import type { UserProfile } from "@/types/domain";

export const userService = {
  async me(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>("/api/me");
    return data;
  }
};
