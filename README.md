# 📈 Stock Management System

> **Modern full-stack portfolio tracker with enterprise-grade architecture**

Track your stock portfolio with real-time data, smart caching, and bulletproof authentication. Built to showcase production-ready patterns and modern development practices.

![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11.0.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![Nx](https://img.shields.io/badge/Nx-Monorepo-lightblue?logo=nx)

## ✨ The Cool Stuff

🚀 **Smart Rate Limiting** - Token bucket algorithm handles API quotas like a boss  
🔄 **Auto-Retry Logic** - Exponential backoff with jitter for bulletproof resilience  
🎨 **Dark/Light Theme** - System preference detection + smooth transitions  
⚡ **Multi-Layer Caching** - From browser to database, performance everywhere  
🛡️ **Error Boundaries** - React errors caught and handled gracefully  
🔐 **JWT Authentication** - Secure, scalable, role-based access control

## 🚀 Quick Start

```bash
# Setup
npm install
echo "MONGODB_URI=mongodb://localhost:27017/stock-management" > .env
echo "FMP_API_KEY=your_fmp_api_key" >> .env

# Launch 🚀
npx nx serve backend    # → http://localhost:3000
npx nx serve frontend   # → http://localhost:4200

# Test it out
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com"}'
```

**Prerequisites:** Node.js 20+ • MongoDB • [FMP API key](https://financialmodelingprep.com) (free)

## 🏗️ Architecture

**Backend (NestJS):** `auth` • `portfolio` • `stock` • `shared`  
**Frontend (React + Vite):** Context-driven state • Smart caching • Error boundaries

## 🎯 Features

- 📊 Real-time stock tracking with portfolio management
- 🔐 JWT authentication with role-based access  
- 🌙 Dark/light theme with system detection
- ⚡ Intelligent caching across all layers
- 🛡️ Bulletproof error handling and recovery
- 📱 Fully responsive Material-UI design

---

**Built with AI + Human oversight** • [Interview demo project]