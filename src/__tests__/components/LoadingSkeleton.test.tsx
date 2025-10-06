import { render } from '@/__tests__/utils/test-utils'
import {
  GameCardSkeleton,
  GameListSkeleton,
  GameDetailSkeleton
} from '@/components/LoadingSkeleton'

describe('LoadingSkeleton Components', () => {
  it('renders GameCardSkeleton', () => {
    render(<GameCardSkeleton />)

    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('renders GameListSkeleton', () => {
    render(<GameListSkeleton />)

    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(3)
  })

  it('renders GameDetailSkeleton', () => {
    const { container } = render(<GameDetailSkeleton />)

    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })
})

