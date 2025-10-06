export const API_ENDPOINTS = {
  LOGIN: '/login',
  GAMES: '/games',
  CATEGORIES: '/categories'
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
