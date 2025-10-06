import {
  createApiError,
  isNetworkError,
  isTimeoutError,
  parseApiError,
  type ApiError
} from '@/types/errors'

describe('Error Handling Utilities', () => {
  describe('createApiError', () => {
    it('should create an API error with all properties', () => {
      const error = createApiError('NETWORK', 'Connection failed', 500, 'Details')

      expect(error).toEqual({
        type: 'NETWORK',
        message: 'Connection failed',
        code: 500,
        details: 'Details'
      })
    })

    it('should create an API error with minimal properties', () => {
      const error = createApiError('SERVER', 'Internal error')

      expect(error).toEqual({
        type: 'SERVER',
        message: 'Internal error',
        code: undefined,
        details: undefined
      })
    })
  })

  describe('isNetworkError', () => {
    it('should identify network errors', () => {
      const networkError = new TypeError('fetch failed')
      expect(isNetworkError(networkError)).toBe(true)
    })

    it('should not identify non-network errors', () => {
      const regularError = new Error('Something went wrong')
      expect(isNetworkError(regularError)).toBe(false)
    })

    it('should handle non-Error objects', () => {
      expect(isNetworkError('string')).toBe(false)
      expect(isNetworkError(null)).toBe(false)
      expect(isNetworkError(undefined)).toBe(false)
    })
  })

  describe('isTimeoutError', () => {
    it('should identify timeout errors', () => {
      const timeoutError = new Error('Request timed out')
      timeoutError.name = 'AbortError'
      expect(isTimeoutError(timeoutError)).toBe(true)
    })

    it('should not identify non-timeout errors', () => {
      const regularError = new Error('Something went wrong')
      expect(isTimeoutError(regularError)).toBe(false)
    })

    it('should handle non-Error objects', () => {
      expect(isTimeoutError('string')).toBe(false)
      expect(isTimeoutError(null)).toBe(false)
      expect(isTimeoutError(undefined)).toBe(false)
    })
  })

  describe('parseApiError', () => {
    it('should parse network errors', () => {
      const networkError = new TypeError('fetch failed')
      const result = parseApiError(networkError)

      expect(result.type).toBe('NETWORK')
      expect(result.message).toContain('Network connection failed')
    })

    it('should parse timeout errors', () => {
      const timeoutError = new Error('Request timed out')
      timeoutError.name = 'AbortError'
      const result = parseApiError(timeoutError)

      expect(result.type).toBe('TIMEOUT')
      expect(result.message).toContain('Request timed out')
    })

    it('should parse structured error responses', () => {
      const structuredError = new Error(JSON.stringify({
        status: 'error',
        message: 'Validation failed',
        code: 400,
        details: 'Invalid input'
      }))

      const result = parseApiError(structuredError)

      expect(result.type).toBe('SERVER')
      expect(result.message).toBe('Validation failed')
      expect(result.code).toBe(400)
      expect(result.details).toBe('Invalid input')
    })

    it('should handle regular Error objects', () => {
      const regularError = new Error('Something went wrong')
      const result = parseApiError(regularError)

      expect(result.type).toBe('SERVER')
      expect(result.message).toBe('Something went wrong')
    })

    it('should handle non-Error objects', () => {
      const result = parseApiError('string error')

      expect(result.type).toBe('SERVER')
      expect(result.message).toBe('An unexpected error occurred. Please try again.')
    })

    it('should handle malformed JSON in error message', () => {
      const malformedError = new Error('{"invalid": json}')
      const result = parseApiError(malformedError)

      expect(result.type).toBe('SERVER')
      expect(result.message).toBe('{"invalid": json}')
    })

    it('should handle null/undefined errors', () => {
      const result1 = parseApiError(null)
      const result2 = parseApiError(undefined)

      expect(result1.type).toBe('SERVER')
      expect(result2.type).toBe('SERVER')
      expect(result1.message).toBe('An unexpected error occurred. Please try again.')
      expect(result2.message).toBe('An unexpected error occurred. Please try again.')
    })
  })

  describe('Error type definitions', () => {
    it('should have correct ApiError interface structure', () => {
      const error: ApiError = {
        type: 'NETWORK',
        message: 'Test error',
        code: 500,
        details: 'Test details'
      }

      expect(error.type).toBe('NETWORK')
      expect(error.message).toBe('Test error')
      expect(error.code).toBe(500)
      expect(error.details).toBe('Test details')
    })

    it('should allow optional properties', () => {
      const error: ApiError = {
        type: 'SERVER',
        message: 'Test error'
      }

      expect(error.code).toBeUndefined()
      expect(error.details).toBeUndefined()
    })
  })
})

