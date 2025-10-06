export const MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Invalid credentials. Please try again.',
  LOGIN_VALIDATION_USERNAME_REQUIRED: 'Username is required',
  LOGIN_VALIDATION_PASSWORD_REQUIRED: 'Password is required',
  LOGIN_VALIDATION_USERNAME_MIN_LENGTH: 'Username must be at least 3 characters',
  LOGIN_VALIDATION_PASSWORD_MIN_LENGTH: 'Password must be at least 3 characters',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  AUTH_REQUIRED: 'Please log in to access this page.',
  AUTHENTICATION_EXPIRED: 'Your session has expired. Please log in again.',

  // Games
  GAMES_LOADING: 'Loading games...',
  GAMES_ERROR: 'Failed to load games. Please try again.',
  GAME_NOT_FOUND: 'The requested game could not be found.',
  NO_GAMES_AVAILABLE: 'No games available. Please check back later.',
  NO_GAMES_FOUND: 'No games found. Try adjusting your search or category filter.',

  // Network & API
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  API_ERROR: 'Server error occurred. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',

  // General
  LOADING: 'Loading...',
  ERROR_OCCURRED: 'An error occurred. Please try again.',
  TRY_AGAIN: 'Try Again',
  RETRY: 'Retry',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',

  // Search
  SEARCH_PLACEHOLDER: 'Search games...',
  SEARCH_HEADER_PLACEHOLDER: 'Search',

  // Categories
  CATEGORIES: 'Categories',

  // Actions
  PLAY_GAME: 'Play',
  LOGIN: 'Login',
  LOGOUT: 'Log out',
  GET_STARTED: 'Get Started',

  // Accessibility
  BACK_TO_GAMES: 'Go back to games list',
  SEARCH_GAMES: 'Search for games',
  SELECT_CATEGORY: 'Select category to filter games',
  GAME_DETAILS: 'Game details and information'
} as const;
