export interface ApiError {
  type: 'NETWORK' | 'VALIDATION' | 'AUTH' | 'SERVER' | 'NOT_FOUND' | 'TIMEOUT';
  message: string;
  code?: number;
  details?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: number;
  details?: string;
}

export const createApiError = (
  type: ApiError['type'],
  message: string,
  code?: number,
  details?: string
): ApiError => ({
  type,
  message,
  code,
  details
});

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message.includes('fetch');
};

export const isTimeoutError = (error: unknown): boolean => {
  return error instanceof Error && error.name === 'AbortError';
};

export const parseApiError = (error: unknown): ApiError => {
  if (isNetworkError(error)) {
    return createApiError('NETWORK', 'Network connection failed. Please check your internet connection.');
  }

  if (isTimeoutError(error)) {
    return createApiError('TIMEOUT', 'Request timed out. Please try again.');
  }

  if (error instanceof Error) {
    // Try to parse structured error response
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.status === 'error') {
        return createApiError('SERVER', parsed.message, parsed.code, parsed.details);
      }
    } catch {
      // If parsing fails, use the error message as is
    }

    return createApiError('SERVER', error.message);
  }

  return createApiError('SERVER', 'An unexpected error occurred. Please try again.');
};
