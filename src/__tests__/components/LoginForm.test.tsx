import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import { LoginForm } from '@/components'
import userEvent from '@testing-library/user-event'
import { mockFetch, mockLoginResponse } from '@/__tests__/utils/test-utils'

jest.mock('@/services/auth', () => ({
  login: jest.fn()
}))

describe('LoginForm Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch(mockLoginResponse)
  })

  it('renders login form elements', () => {
    render(<LoginForm />)

    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />)

    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    expect(screen.getByText(/username is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows validation error for short username', async () => {
    render(<LoginForm />)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'ab')
    await user.click(loginButton)

    expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument()
  })

  it('shows loading state during login', async () => {
    const { login } = jest.requireMock('@/services/auth')
    login.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    render(<LoginForm />)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.click(loginButton)

    expect(screen.getByText(/logging in/i)).toBeInTheDocument()
    expect(loginButton).toBeDisabled()
  })

  it('handles successful login', async () => {
    const { login } = jest.requireMock('@/services/auth')
    login.mockResolvedValue(mockLoginResponse)

    render(<LoginForm />)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.click(loginButton)

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('testuser', 'testpass')
    })
  })

  it('handles login error', async () => {
    const { login } = jest.requireMock('@/services/auth')
    login.mockResolvedValue({ status: 'fail', error: 'Invalid credentials' })

    render(<LoginForm />)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'wrongpass')
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('handles network error', async () => {
    const { login } = jest.requireMock('@/services/auth')
    login.mockRejectedValue(new Error('Network error'))

    render(<LoginForm />)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

})

