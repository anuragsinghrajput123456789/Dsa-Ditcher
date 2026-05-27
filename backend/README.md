# 🖥️ DSA Ditcher - Express Backend API Server

This is the backend API server of the full-stack MERN application, **DSA Ditcher**. It exposes RESTful API endpoints for user authorization, custom sheets persistence, chat logs history, and proxies AI requests securely via OpenRouter.

---

## 🚀 Key Technologies
* **Node.js & Express:** Modern API architecture with Express 5+ rejected promise handling.
* **MongoDB & Mongoose:** Data schemas and persistence models for auth, custom sheets, and chat logs.
* **JWT (JSON Web Token):** State-free, cryptographically secured session authorizations.
* **Bcrypt.js:** Safe one-way password hashing algorithms.
* **Native global Fetch:** Performs high-performance OpenRouter AI completions integrations directly in Node.js.

---

## 📂 Backend File Architecture
```text
backend/
├── config/
│   └── db.js               # Database connection handler
├── controllers/
│   ├── authController.js   # User registration & logins
│   ├── aiController.js     # OpenRouter proxy (analyze, chat, complexity)
│   ├── sheetController.js  # Custom sheet CRUD actions
│   ├── chatController.js   # DB chat logs persistence
│   └── userController.js   # User stats & solved metrics
├── middleware/
│   ├── authMiddleware.js   # JWT verification & request protection
│   └── errorMiddleware.js  # Global Express 404 & Exception handlers
├── models/
│   ├── User.js             # Mongoose User collection schema
│   ├── Sheet.js            # Mongoose Custom Sheet collection schema
│   └── Chat.js             # Mongoose Chat message collection schema
├── routes/
│   ├── authRoutes.js       # /api/auth endpoints
│   ├── aiRoutes.js         # /api/ai proxy endpoints
│   ├── sheetRoutes.js      # /api/sheets endpoints
│   ├── chatRoutes.js       # /api/chats endpoints
│   └── userRoutes.js       # /api/users endpoints
├── server.js               # Express app entrypoint & configuration
└── .env                    # Local environment variables
```

---

## 🔒 Configuration Environment Variables (`.env`)
Create a `.env` file in the root of this `backend` folder and populate it with the following parameters:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dsa-ditcher
JWT_SECRET=your_jwt_secret_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## 🧪 Expose Endpoints API Table

| Category | Method | Endpoint | Description | Auth Required |
| :--- | :---: | :--- | :--- | :---: |
| **Auth** | `POST` | `/api/auth/register` | Register a new user | No |
| **Auth** | `POST` | `/api/auth/login` | Log in and get JWT token | No |
| **User** | `GET` | `/api/users/profile` | Retrieve user stats & solved count | Yes |
| **User** | `PUT` | `/api/users/stats` | Increment solved count and update level | Yes |
| **AI Proxy** | `POST` | `/api/ai/analyze` | Explains DSA problem & gives progressive hints | No |
| **AI Proxy** | `POST` | `/api/ai/chat` | General chatbot expert conversational assistant | No |
| **AI Proxy** | `POST` | `/api/ai/complexity` | Evaluates space and time Big O complexity (JSON) | No |
| **Sheets** | `GET` | `/api/sheets` | Get all custom sheets of active user | Yes |
| **Sheets** | `POST` | `/api/sheets` | Create a new custom practice sheet | Yes |
| **Sheets** | `PUT` | `/api/sheets/:id` | Update sheet title, description, or links | Yes |
| **Sheets** | `DELETE` | `/api/sheets/:id` | Delete custom practice sheet | Yes |
| **Chats** | `GET` | `/api/chats` | Get all saved analyzer chat logs | Yes |
| **Chats** | `POST` | `/api/chats` | Save a specific message to history | Yes |
| **Chats** | `DELETE` | `/api/chats` | Clear all analyzer chat logs for user | Yes |
| **Chats** | `DELETE` | `/api/chats/:id` | Delete a single message from logs | Yes |

---

## ⚡ Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start MongoDB locally:**
   Make sure MongoDB is running on your machine.
3. **Launch local dev server (Nodemon):**
   ```bash
   npm run dev
   ```
4. **Launch production server:**
   ```bash
   npm start
   ```
