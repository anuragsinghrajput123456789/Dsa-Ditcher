# AlgoSpark Operations, Maintenance & Production Support Guide

## Overview

This guide outlines operational procedures, logging standards, rate-limiting policies, database connection pool monitoring, and disaster recovery strategies for maintaining **AlgoSpark (DSA-Ditcher)** in production.

---

## 🛠️ Operational Architecture & Controls

### 1. Logging Strategy
- **Development**: Console outputs formatted with Morgan (`morgan('dev')`) for real-time HTTP endpoint tracing.
- **Production**: Helmet security headers and compression enabled; exception handlers log structured error output without exposing database internal schemas or server stack traces to clients.
- **Process Exception Shields**:
  ```javascript
  process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL ERROR: Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('CRITICAL ERROR: Uncaught Exception thrown:', error);
    process.exit(1);
  });
  ```

---

### 2. Database Maintenance & Connection Pooling (`backend/config/db.js`)
- **Connection Engine**: Mongoose connected to MongoDB Atlas over TLS/SSL.
- **Connection Retry Handling**: Automatically intercepts database connectivity failures during startup and gracefully logs retry steps.
- **Indexing Strategy**: Single and compound index schemas enforced on `User` (`email`) and `Sheet` (`user`).

---

### 3. API Rate Limiting & DDoS Defense (`backend/middleware/rateLimitMiddleware.js`)
AlgoSpark guards backend services against brute-force attacks and resource overuse via `express-rate-limit`:
- **Auth Limiter (`/api/auth/*`)**: 10 requests per 15-minute window (guards `/login` and `/register`).
- **AI Limiter (`/api/ai/*`)**: 30 requests per 15-minute window (guards LLM prompt consumption).
- **API Limiter (`/api/*`)**: 100 requests per 15-minute window for standard data operations.

---

### 4. Graceful Shutdown Sequence
When receiving termination signals (`SIGTERM` or `SIGINT`), the Express application closes HTTP listening sockets before severing database pools:

```javascript
const gracefulShutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server...`);
  server.close(() => {
    console.log('HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
};
```

---

## 🔄 Routine Operations Checklist

| Operational Task | Frequency | Procedure / Command |
|---|---|---|
| Dependency Vulnerability Scan | Weekly | `npm audit` inside `backend/` and `frontend/` |
| Database Index Check | Monthly | Inspect MongoDB Atlas indexes on `users`, `sheets`, and `chats` |
| AI Fallback Simulation | Bi-weekly | Temporarily unset `OPENROUTER_API_KEY` to verify AST sandbox fallback response |
| SSL & Domain Certificate Renewal | Auto / Annually | Verify HTTPS certificates on hosting domain (Vercel/Render) |
