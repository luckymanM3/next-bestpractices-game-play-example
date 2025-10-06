import request from '@/lib/apiClient'

global.fetch = jest.fn()

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should make successful API request', async () => {
    const mockResponse = { data: 'test' }
      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse)
      })

    const result = await request('/test')

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/test', {
      headers: {
        'Content-Type': 'application/json'
      },
      signal: expect.any(AbortSignal)
    })
    expect(result).toEqual(mockResponse)
  })

  it('should handle API error responses', async () => {
    const errorResponse = { message: 'Not found', code: 404 }
      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: jest.fn().mockResolvedValue(JSON.stringify(errorResponse))
      })

    await expect(request('/test')).rejects.toThrow('{"type":"NOT_FOUND","message":"Not found","code":404,"details":""}')
  })

  it('should handle network errors', async () => {
    ; (global.fetch as jest.Mock).mockRejectedValue(new TypeError('fetch failed'))

    await expect(request('/test')).rejects.toThrow('Network connection failed. Please check your internet connection.')
  })

  it('should handle timeout errors', async () => {
    ; (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise((_, reject) => {
        setTimeout(() => {
          const error = new Error('Request timed out')
          error.name = 'AbortError'
          reject(error)
        }, 1000)
      })
    )

    const requestPromise = request('/test')

    jest.advanceTimersByTime(10000)

    await expect(requestPromise).rejects.toThrow('{"type":"TIMEOUT","message":"Request timed out. Please try again."}')
  })

  it('should pass custom headers', async () => {
    const customHeaders = { 'Authorization': 'Bearer token' }
      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({})
      })

    await request('/test', { headers: customHeaders })

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/test', expect.objectContaining({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
      },
      signal: expect.any(AbortSignal)
    }))
  })
})
