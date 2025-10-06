# Next.js App routing with Json server for Game play example project

A React/Next.js application for gaming platform testing with user authentication, game browsing, and responsive design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [API Integration](#api-integration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- User authentication with login/logout
- Game browser with category filtering
- Search functionality across games
- Responsive design with Tailwind CSS
- Built with Next.js 15 and React 19
- Unit and integration tests with Jest
- TypeScript for type safety

## Tech Stack

### Frontend
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React for icons

### Testing
- Jest for testing
- React Testing Library
- User Event for interactions

### Development
- ESLint for code quality
- JSON Server for mock API
- Next Themes for theming

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luckymanM3/next-bestpractices-game-play-example.git
   cd next-bestpractices-game-play-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the mock API server** (in a separate terminal)
   ```bash
   npm run mock-server
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (authenticated)/         # Protected routes
│   │   └── games/              # Games listing and detail pages
│   ├── (unauthenticated)/      # Public routes
│   │   └── login/              # Login page
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/                  # Reusable UI components
│   ├── GameCard.tsx            # Game card component
│   ├── Header.tsx              # Navigation header
│   ├── LoginForm.tsx           # Login form
│   └── LoadingSkeleton.tsx     # Loading states
├── contexts/                    # React contexts
│   ├── SearchContext.tsx       # Search state management
│   └── UserContext.tsx         # User authentication state
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication hook
│   ├── useGame.ts              # Single game hook
│   └── useGames.ts             # Games listing hook
├── services/                    # API service layer
│   ├── auth.ts                 # Authentication API
│   └── games.ts                # Games API
├── types/                       # TypeScript type definitions
│   ├── api.ts                  # API response types
│   └── errors.ts               # Error handling types
├── constants/                   # Application constants
│   ├── api.ts                  # API endpoints
│   ├── messages.ts             # User messages
│   └── routes.ts               # Route definitions
└── __tests__/                   # Test files
    ├── components/             # Component tests
    ├── hooks/                  # Hook tests
    ├── api/                    # API tests
    └── integration/            # Integration tests
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run mock-server` | Start mock API server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- Components - UI rendering and behavior
- Hooks - Custom hook logic and state
- API Services - API integration and errors
- Integration - User flows

### Test Structure

```typescript
// Example test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle user interactions', () => {
    // Test implementation
  });
});
```

## API Integration

The app uses a mock API server for development and testing.

### Mock API Endpoints

- `GET /api/games` - Fetch all games
- `GET /api/categories` - Fetch game categories
- `GET /api/games/:id` - Fetch single game
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout

### API Client

The `apiClient.ts` handles API requests with:
- Request/response interceptors
- Error handling
- Timeout management
- Type safety

## Styling

The project uses Tailwind CSS with:
- Responsive design (mobile-first)
- Component variants
- Custom utilities

## Development

### Code Quality

- ESLint for linting and formatting
- TypeScript for type safety
- Prettier via ESLint

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Built with Next.js, React, and TypeScript
