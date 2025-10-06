export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  GAMES: '/games'
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.GAMES
] as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN
] as const;
