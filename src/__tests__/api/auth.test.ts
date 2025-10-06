import { login, logout } from '@/api/auth'
import { mockLoginResponse } from '@/__tests__/utils/test-utils'

jest.mock('@/lib/apiClient', () => ({
  __esModule: true,
  default: jest.fn()
}))

import request from '@/lib/apiClient'

describe('Auth API', () => {
  const mockRequest = request as jest.MockedFunction<typeof request>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should login successfully', async () => {
      mockRequest.mockResolvedValue(mockLoginResponse)

      const result = await login('testuser', 'testpass')

      expect(mockRequest).toHaveBeenCalledWith('/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'testuser', password: 'testpass' })
      })
      expect(result).toEqual(mockLoginResponse)
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const successResponse = { status: 'success' }
      mockRequest.mockResolvedValue(successResponse)

      const result = await logout('testuser')

      expect(mockRequest).toHaveBeenCalledWith('/logout', {
        method: 'POST',
        body: JSON.stringify({ username: 'testuser' })
      })
      expect(result).toEqual(successResponse)
    })
  })
})

