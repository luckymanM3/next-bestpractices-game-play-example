import { render, screen } from '@/__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'
import GamesPage from '@/app/(authenticated)/games/page'
import { mockGame, mockCategory } from '@/__tests__/utils/test-utils'

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isLoading: false,
    user: { name: 'Test User', avatar: 'test.jpg', event: 'Test event' }
  })
}))

jest.mock('@/hooks/useGames', () => ({
  useGames: jest.fn()
}))

describe('Games Page Integration', () => {
  const user = userEvent.setup()
  const mockUseGames = jest.requireMock('@/hooks/useGames').useGames

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading state', () => {
    mockUseGames.mockReturnValue({
      filteredGames: [],
      categories: [],
      isLoading: true,
      error: '',
      selectedCategory: 0,
      selectCategory: jest.fn(),
      retry: jest.fn(),
      hasGames: false,
      hasFilteredGames: false
    })

    render(<GamesPage />)

    expect(screen.getByText('Games')).toBeInTheDocument()
    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('should display error state', () => {
    mockUseGames.mockReturnValue({
      filteredGames: [],
      categories: [],
      isLoading: false,
      error: 'Failed to load games',
      selectedCategory: 0,
      selectCategory: jest.fn(),
      retry: jest.fn(),
      hasGames: false,
      hasFilteredGames: false
    })

    render(<GamesPage />)

    expect(screen.getByText('Failed to load games. Please try again.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('should handle category selection', async () => {
    const selectCategoryMock = jest.fn()
    mockUseGames.mockReturnValue({
      filteredGames: [mockGame],
      categories: [mockCategory, { id: 2, name: 'Category 2' }],
      isLoading: false,
      error: '',
      selectedCategory: 0,
      selectCategory: selectCategoryMock,
      retry: jest.fn(),
      hasGames: true,
      hasFilteredGames: true
    })

    render(<GamesPage />)

    const categoryButton = screen.getByText('Category 2')
    await user.click(categoryButton)

    expect(selectCategoryMock).toHaveBeenCalledWith(2)
  })
})

