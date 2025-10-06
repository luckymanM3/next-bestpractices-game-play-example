import request from "@/lib/apiClient";
import type { Game, Category } from "@/types/api";
import { API_ENDPOINTS } from "@/constants/api";

export const getGames = () => request<Game[]>(API_ENDPOINTS.GAMES, { method: "GET" });

export const getCategories = () => request<Category[]>(API_ENDPOINTS.CATEGORIES, { method: "GET" });

export const getGame = (gameCode: string) => request<Game>(`${API_ENDPOINTS.GAMES}/${gameCode}`, { method: "GET" });
