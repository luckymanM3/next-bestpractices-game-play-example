import { API_BASE_URL, MESSAGES } from "@/constants";
import { parseApiError, createApiError } from "@/types";

const API_BASE = API_BASE_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMessage = `API Error (${res.status})`;
      let errorDetails = '';

      try {
        const errorBody = await res.text();
        if (errorBody) {
          const parsedError = JSON.parse(errorBody);
          errorMessage = parsedError.message || errorMessage;
          errorDetails = parsedError.details || '';
        }
      } catch {
        // If we can't parse the error body, use a generic message
        errorMessage += `: ${res.statusText || 'Unknown error'}`;
      }

      const apiError = createApiError(
        res.status >= 500 ? 'SERVER' :
          res.status === 404 ? 'NOT_FOUND' :
            res.status === 401 ? 'AUTH' : 'SERVER',
        errorMessage,
        res.status,
        errorDetails
      );

      throw new Error(JSON.stringify(apiError));
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError = createApiError('TIMEOUT', MESSAGES.TIMEOUT_ERROR);
      throw new Error(JSON.stringify(timeoutError));
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = createApiError('NETWORK', MESSAGES.NETWORK_ERROR);
      throw new Error(JSON.stringify(networkError));
    }

    // Re-throw if it's already a structured error
    if (error instanceof Error && error.message.startsWith('{')) {
      throw error;
    }

    // Parse and re-throw as structured error
    const parsedError = parseApiError(error);
    throw new Error(JSON.stringify(parsedError));
  }
}

export default request;