import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import GameCard from '@/components/GameCard'
import { mockGame } from '@/__tests__/utils/test-utils'

describe('GameCard Component', () => {
  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} isMobile={true} />)

    expect(screen.getByText(mockGame.name)).toBeInTheDocument()
    expect(screen.getByText(mockGame.description)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /play test game/i })).toBeInTheDocument()
  })

  it('handles image loading error gracefully', () => {
    render(<GameCard game={mockGame} isMobile={true} />)

    const image = screen.getByAltText(mockGame.name)
    fireEvent.error(image)

    expect(screen.getByText('🎮')).toBeInTheDocument()
  })
})
