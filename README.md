# 📈 Stock Management System

A modern, full-stack stock portfolio management application built with React, NestJS, and MongoDB. Features real-time stock tracking, responsive design, intelligent caching, and comprehensive error handling.

![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11.0.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-7.2.0-blue?logo=mui)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![Nx](https://img.shields.io/badge/Nx-Monorepo-lightblue?logo=nx)

## ✨ Features

### 🎯 Core Functionality
- **Portfolio Management**: Add, remove, and track stock symbols
- **Stock Details**: View detailed stock information and prices
- **Responsive Grid Layout**: Optimized for mobile, tablet, and desktop
- **Real-time Data**: Stock quotes with intelligent 60-second caching

### 🎨 User Experience
- **Dark/Light Theme**: Persistent theme switching with system preference detection
- **Loading States**: Beautiful skeleton loading and progress indicators
- **Error Boundaries**: Comprehensive error handling with retry mechanisms
- **404 Pages**: Custom not-found pages with navigation options
- **Pagination**: Client-side pagination for large stock lists

### ⚡ Performance
- **API Caching**: 60-second cache for stock quotes, 30-second for portfolio
- **Request Memoization**: Prevents duplicate API calls
- **Prefetching**: Automatic prefetching of stock details for better UX
- **Memory Management**: Automatic cleanup of expired cache entries

### 🛠️ Developer Experience
- **TypeScript**: Full type safety across frontend and backend
- **Error Tracking**: Comprehensive error logging and debugging tools
- **Cache Debug Panel**: Development tools for cache inspection
- **Hot Reload**: Fast development with Vite and NestJS

## 🏗️ Architecture

```
stock-management/
├── frontend/                 # React + Vite + Material-UI
│   ├── src/
│   │   ├── app/             # Main application components
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components (404, etc.)
│   │   ├── services/        # API services and caching
│   │   └── utils/           # Utility functions
│   └── index.html
├── backend/                 # NestJS + MongoDB
│   ├── src/
│   │   ├── app/            # Application modules
│   │   ├── portfolio/      # Portfolio management
│   │   └── stock/          # Stock data handling
│   └── main.ts
├── backend-e2e/            # End-to-end tests
├── frontend-e2e/           # Frontend E2E tests
└── docker-compose.yml      # MongoDB setup
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Docker** (for MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Backend (NestJS)
   npx nx serve backend

   # Terminal 2 - Frontend (React + Vite)
   npx nx serve frontend
   ```

5. **Open the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000/api

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Material-UI v7** - React component library
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - Type-safe server-side development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express** - Web application framework

### DevOps & Tools
- **Nx** - Monorepo build system
- **Docker** - Containerization for MongoDB
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📱 Screenshots

### Desktop View
- **Portfolio Dashboard**: Grid layout with stock cards
- **Dark/Light Theme**: Seamless theme switching
- **Stock Details**: Detailed view with pricing information

### Mobile View
- **Responsive Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and smooth interactions

## 🎯 API Endpoints

### Portfolio Management
```
GET    /api/portfolio          # Get user's portfolio
POST   /api/portfolio          # Add stock to portfolio
DELETE /api/portfolio/:symbol  # Remove stock from portfolio
```

### Stock Data
```
GET    /api/stocks/:symbol     # Get stock details and price
```

## 🔧 Configuration

### Environment Variables
Create `.env` files for configuration:

**Backend (.env)**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/stock-management
```

**Frontend**
- Configuration is handled through Vite's environment system
- API base URL is configured in `src/app/axios.ts`

## 🚦 Development

### Running Tests
```bash
# Unit tests
npx nx test frontend
npx nx test backend

# E2E tests
npx nx e2e frontend-e2e
npx nx e2e backend-e2e
```

### Building for Production
```bash
# Build all projects
npx nx build frontend
npx nx build backend

# Build specific project
npx nx build frontend --prod
```

### Code Quality
```bash
# Lint code
npx nx lint frontend
npx nx lint backend

# Type checking
npx nx typecheck frontend
npx nx typecheck backend
```

## 📊 Performance Features

### Caching Strategy
- **Stock Quotes**: 60-second cache to reduce API calls
- **Portfolio Data**: 30-second cache for quick access
- **Automatic Cleanup**: Background service removes expired entries
- **Smart Invalidation**: Cache cleared on data mutations

### Optimization Techniques
- **Request Deduplication**: Prevents duplicate API calls
- **Prefetching**: Loads related data proactively
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Optimized bundle sizes

## 🔒 Error Handling

### Frontend Error Boundaries
- **Component-Level**: Isolated error handling for components
- **Route-Level**: Error boundaries for each route
- **Global**: App-level error boundary as fallback

### Error Recovery
- **Retry Mechanisms**: Automatic and manual retry options
- **Fallback UI**: Graceful degradation with fallback components
- **User Feedback**: Clear error messages and recovery actions

## 🎨 Theming

### Material-UI Theme
- **Custom Color Palette**: Branded colors for light and dark modes
- **Typography**: Inter font family with consistent sizing
- **Component Overrides**: Customized MUI components
- **Responsive Design**: Mobile-first approach

### Theme Features
- **Dark/Light Mode**: Toggle with persistence
- **System Preference**: Respects OS theme setting
- **Smooth Transitions**: Animated theme changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for the excellent React component library
- **NestJS** for the powerful Node.js framework
- **Nx** for the amazing monorepo tooling
- **React Team** for the fantastic frontend library

---

**Built with ❤️ using modern web technologies**
