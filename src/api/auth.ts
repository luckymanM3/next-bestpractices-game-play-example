import request from "@/lib/apiClient";
import { LoginResponse } from "@/types/api";
import { API_ENDPOINTS } from "@/constants/api";

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  return request<LoginResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const logout = async (username: string): Promise<{ status: string }> => {
  return request<{ status: string }>('/logout', {
    method: "POST",
    body: JSON.stringify({ username }),
  });
};
