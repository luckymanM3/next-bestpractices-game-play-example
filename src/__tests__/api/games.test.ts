import { getGames, getCategories, getGame } from '@/api/games'
import { mockGame, mockCategory, createMockApiError } from '@/__tests__/utils/test-utils'

jest.mock('@/lib/apiClient', () => ({
  __esModule: true,
  default: jest.fn()
}))

import request from '@/lib/apiClient'

describe('Games API', () => {
  const mockRequest = request as jest.MockedFunction<typeof request>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getGames', () => {
    it('should fetch games successfully', async () => {
      const games = [mockGame]
      mockRequest.mockResolvedValue(games)

      const result = await getGames()

      expect(mockRequest).toHaveBeenCalledWith('/games', { method: 'GET' })
      expect(result).toEqual(games)
    })

    it('should handle API errors', async () => {
      const apiError = createMockApiError('SERVER', 'Failed to fetch games')
      mockRequest.mockRejectedValue(apiError)

      await expect(getGames()).rejects.toThrow('Failed to fetch games')
    })
  })

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const categories = [mockCategory]
      mockRequest.mockResolvedValue(categories)

      const result = await getCategories()

      expect(mockRequest).toHaveBeenCalledWith('/categories', { method: 'GET' })
      expect(result).toEqual(categories)
    })
  })

  describe('getGame', () => {
    it('should fetch single game successfully', async () => {
      mockRequest.mockResolvedValue(mockGame)

      const result = await getGame('test-game')

      expect(mockRequest).toHaveBeenCalledWith('/games/test-game', { method: 'GET' })
      expect(result).toEqual(mockGame)
    })
  })
})

