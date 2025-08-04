# 📈 Stock Management System
**Full-Stack Demo Project for Technical Interviews**

A modern stock portfolio management application demonstrating enterprise-level architecture, best practices, and real-world problem solving with React, NestJS, and MongoDB.

![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11.0.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-7.2.0-blue?logo=mui)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![Nx](https://img.shields.io/badge/Nx-Monorepo-lightblue?logo=nx)

## 🎯 What This Demonstrates

### **Backend Engineering Skills**
- **API Design**: RESTful API with proper HTTP methods and status codes
- **Rate Limiting**: Token bucket algorithm for external API management
- **Retry Logic**: Exponential backoff with jitter for resilience
- **Authentication**: Token-based auth with role-based access control
- **Error Handling**: Comprehensive exception handling and logging
- **Database Integration**: MongoDB with Mongoose ODM
- **Dependency Injection**: NestJS modular architecture

### **Frontend Engineering Skills**
- **Modern React**: Hooks, Context API, and functional components
- **State Management**: Efficient local state with intelligent caching
- **Performance**: Memoization, pagination, and optimized re-renders
- **User Experience**: Loading states, error boundaries, theme switching
- **Responsive Design**: Mobile-first approach with Material-UI
- **Error Recovery**: Graceful degradation and retry mechanisms

### **Architecture & DevOps**
- **Monorepo Management**: Nx workspace with multiple applications
- **Microservices**: Separated frontend/backend with clear boundaries
- **Caching Strategy**: Multi-layer caching for performance
- **TypeScript**: Full type safety across the entire stack
- **Code Organization**: Clean architecture with separation of concerns

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- MongoDB running locally or via Docker
- FMP API key (free at financialmodelingprep.com)

### Setup
```bash
# Clone and install
npm install

# Environment setup
echo "MONGODB_URI=mongodb://localhost:27017/stock-management" > .env
echo "FMP_API_KEY=your_api_key_here" >> .env

# Start development servers
npx nx serve backend    # Backend: http://localhost:3000
npx nx serve frontend   # Frontend: http://localhost:4200
```

### Demo Authentication
```bash
# Get demo token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com"}'

# Use token for API calls
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/stocks/AAPL
```

## 🏗️ Architecture Overview

### **Backend (NestJS)**
```
├── auth/              # Authentication & authorization
│   ├── guards/        # Route protection
│   ├── middleware/    # Token validation
│   └── services/      # Auth logic
├── shared/            # Reusable services
│   ├── services/      # FMP API wrapper
│   └── utils/         # Rate limiter, retry logic
├── stock/             # Stock data endpoints
└── portfolio/         # Portfolio management
```

**Key Implementations:**
- **Rate Limiting**: Token bucket algorithm preventing API abuse
- **Retry Logic**: Exponential backoff with jitter for external API resilience
- **Auth System**: Token-based authentication with role-based access
- **Error Handling**: Structured exceptions with proper HTTP status codes

### **Frontend (React + Vite)**
```
├── app/               # Main application
├── components/        # Reusable UI components
├── contexts/          # React contexts (theme, etc.)
├── hooks/             # Custom hooks (caching, errors)
├── services/          # API integration
└── utils/             # Utilities and helpers
```

**Key Implementations:**
- **Intelligent Caching**: Multi-tier caching with automatic cleanup
- **Error Boundaries**: Comprehensive error handling with recovery options
- **Theme System**: Dark/light mode with system preference detection
- **Performance**: Request memoization and optimized re-renders

## 🔧 Technical Highlights

### **External API Management**
- **Rate Limiting**: Handles FMP API quotas with token bucket algorithm
- **Retry Strategy**: Automatic retry on transient failures (network, 5xx, 429)
- **Error Mapping**: Converts external API errors to meaningful user messages
- **Request Optimization**: Prevents duplicate calls and manages concurrency

### **Authentication & Security**
- **Token-Based Auth**: Simple, scalable authentication system
- **Role-Based Access**: Different access levels (user, admin)
- **Route Protection**: Declarative security with decorators
- **Session Management**: Token expiration and revocation

### **Performance & Caching**
- **Multi-Layer Caching**: Browser → App → API → External API
- **Cache Invalidation**: Time-based and manual cache clearing
- **Memory Management**: Automatic cleanup prevents memory leaks
- **Request Deduplication**: Prevents multiple identical API calls

### **Error Handling & Resilience**
- **Error Boundaries**: Catch and handle React component errors
- **Retry Mechanisms**: Both automatic (API level) and manual (UI level)
- **Graceful Degradation**: App continues working when external APIs fail
- **Comprehensive Logging**: Detailed error tracking for debugging

## 📊 What This Project Shows

### **Problem-Solving Skills**
- **Real-World Constraints**: Working with external API rate limits
- **Performance Optimization**: Caching strategies for better UX
- **Error Recovery**: Handling network failures and API downtime
- **Security**: Implementing authentication without over-engineering

### **Code Quality**
- **Clean Architecture**: Separation of concerns and modularity
- **Type Safety**: Full TypeScript implementation
- **Testing Mindset**: Structured for easy testing (though tests not implemented in demo)
- **Documentation**: Self-documenting code with comprehensive comments

### **Modern Development Practices**
- **Monorepo**: Nx workspace for multi-application management
- **Microservices**: Clear frontend/backend separation
- **Dependency Injection**: Proper IoC container usage
- **Configuration Management**: Environment-based configuration

## 🎛️ Available Features

### **Core Functionality**
- Add/remove stocks from portfolio
- View real-time stock quotes and prices
- Company profile and historical data
- Dark/light theme switching
- Responsive design for all devices

### **Technical Features**
- Rate-limited external API calls
- Intelligent caching with cleanup
- Token-based authentication
- Role-based access control
- Comprehensive error handling
- Performance monitoring

### **Development Features**
- Hot reload in development
- TypeScript across the entire stack
- Nx monorepo tooling
- Structured logging
- Debug endpoints for monitoring

---

**Created as a technical demonstration for software engineering interviews**