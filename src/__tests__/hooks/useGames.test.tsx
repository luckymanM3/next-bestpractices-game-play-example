import { renderHook, act } from '@testing-library/react'
import { useGames } from '@/hooks/useGames'
import { SearchProvider } from '@/contexts/SearchContext'
import { mockGame, mockCategory } from '@/__tests__/utils/test-utils'

jest.mock('@/services/games', () => ({
  getGames: jest.fn(),
  getCategories: jest.fn()
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SearchProvider>{children}</SearchProvider>
)

describe('useGames Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useGames(), { wrapper })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.games).toEqual([])
    expect(result.current.filteredGames).toEqual([])
    expect(result.current.categories).toEqual([])
    expect(result.current.error).toBe('')
  })

  it('should fetch games and categories successfully', async () => {
    const { getGames, getCategories } = jest.requireMock('@/services/games')
    getGames.mockResolvedValue([mockGame])
    getCategories.mockResolvedValue([mockCategory])

    const { result } = renderHook(() => useGames(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.games).toEqual([mockGame])
    expect(result.current.filteredGames).toEqual([mockGame])
    expect(result.current.categories).toEqual([mockCategory])
    expect(result.current.error).toBe('')
  })

  it('should handle fetch error', async () => {
    const { getGames, getCategories } = jest.requireMock('@/services/games')
    getGames.mockRejectedValue(new Error('API Error'))
    getCategories.mockResolvedValue([mockCategory])

    const { result } = renderHook(() => useGames(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('API Error')
  })

  it('should filter games by search query', async () => {
    const { getGames, getCategories } = jest.requireMock('@/services/games')
    const games = [
      { ...mockGame, name: 'Action Game' },
      { ...mockGame, name: 'Puzzle Game', code: 'puzzle-game' }
    ]
    getGames.mockResolvedValue(games)
    getCategories.mockResolvedValue([mockCategory])

    const { result } = renderHook(() => useGames(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.selectCategory(0)
    })

    expect(result.current.filteredGames).toEqual(games)
  })

  it('should filter games by category', async () => {
    const { getGames, getCategories } = jest.requireMock('@/services/games')
    const games = [
      { ...mockGame, categoryIds: [1] },
      { ...mockGame, name: 'Other Game', code: 'other-game', categoryIds: [2] }
    ]
    getGames.mockResolvedValue(games)
    getCategories.mockResolvedValue([mockCategory])

    const { result } = renderHook(() => useGames(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.selectCategory(1)
    })

    expect(result.current.selectedCategory).toBe(1)
    expect(result.current.filteredGames).toEqual([games[0]])
  })

  it('should retry on error', async () => {
    const { getGames, getCategories } = jest.requireMock('@/services/games')
    getGames.mockRejectedValueOnce(new Error('First error'))
    getGames.mockResolvedValueOnce([mockGame])
    getCategories.mockResolvedValue([mockCategory])

    const { result } = renderHook(() => useGames(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('First error')

    act(() => {
      result.current.retry()
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('')
    expect(result.current.games).toEqual([mockGame])
  })
})

