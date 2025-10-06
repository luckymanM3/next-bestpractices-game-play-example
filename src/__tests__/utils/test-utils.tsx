import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { UserProvider } from '@/contexts/UserContext'
import { SearchProvider } from '@/contexts/SearchContext'

// Mock data for testing
export const mockGame = {
  name: 'Test Game',
  description: 'A test game description',
  code: 'test-game',
  icon: 'images/game-icon/test-game.png',
  categoryIds: [1, 2]
}

export const mockCategory = {
  id: 1,
  name: 'Test Category'
}

export const mockPlayer = {
  name: 'Test Player',
  avatar: 'images/avatar/test.jpg',
  event: 'Test event'
}

export const mockLoginResponse = {
  status: 'success' as const,
  player: mockPlayer
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </UserProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock fetch responses
export const mockFetch = <T,>(response: T, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: jest.fn().mockResolvedValue(response),
    text: jest.fn().mockResolvedValue(JSON.stringify(response)),
  })
}

export const mockFetchError = (error: string) => {
  global.fetch = jest.fn().mockRejectedValue(new Error(error))
}

// Helper to create mock API errors
export const createMockApiError = (type: string, message: string) => {
  return new Error(JSON.stringify({
    type,
    message,
    code: 400
  }))
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Simple test to avoid "no tests" error
describe('Test Utils', () => {
  it('should export test utilities', () => {
    expect(mockGame).toBeDefined()
    expect(mockCategory).toBeDefined()
    expect(mockPlayer).toBeDefined()
    expect(mockLoginResponse).toBeDefined()
  })
})
