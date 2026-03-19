# 🚀 PromptVault Backend

This is the backend repository for **PromptVault**, an AI prompt marketplace built for **Assignment 5 (Batch 6)**.

## 🛠️ Tech Stack
* **Node.js & Express.js** - REST API development
* **Prisma (v7)** - Database ORM
* **PostgreSQL (Neon DB)** - Relational serverless database
* **JWT** - Secure stateless authentication
* **Swagger** - Interactive API Documentation

---

## 📂 Project Structure
The backend follows a highly scalable modular architecture pattern:

```bash
src/
├── app.ts                  # Express configurations & middlewares
├── server.ts               # Database connection and server listening
├── lib/prisma.ts           # Global prisma client initialization
├── errors/                 # Error handling classes (AppError)
└── app/
    ├── middlewares/        # globalErrorHandler.ts, notFound.ts, auth.ts
    ├── routes/             # index.ts (central router combining all modules)
    ├── utils/              # Helper functions (catchAsync, sendResponse)
    └── modules/            # Organized feature modules (Auth, User, Prompt, Order, Review)
```

---

## 💻 Local Setup Instructions

Follow these step-by-step instructions to get the backend running on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/assign_5_promtvault_back.git
cd assign_5_promtvault_back
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following keys. Ensure you have your Neon DB connection string ready.
```env
# Database connection directly to Neon Serverless Postgres
DATABASE_URL="postgresql://<user>:<password>@<host>/neondb?sslmode=require"

# JWT Secret for signing authentication tokens
JWT_SECRET="generate-a-super-secret-key-here"
JWT_EXPIRES_IN="7d"

# Server Port
PORT=5000
```

### 4. Database Initialization (Prisma)
Because we use Prisma 7, the `DATABASE_URL` is safely picked up automatically from `.env` via `prisma.config.ts`.
To apply the database schema (User, Prompt, Order, Review models) and create your tables:
```bash
npx prisma migrate dev --name init
```
*(Optional) If you want to view your database using Prisma Studio, run:*
```bash
npx prisma studio
```

### 5. Run the Server
To start the Express server in development mode:
```bash
npm run dev
```
*(Assuming you have configured a dev script like `ts-node-dev src/server.ts` or `nodemon` in your package.json)*

### 6. Swagger API Documentation
Once the server is running, the interactive Swagger UI documentation will be available at:
`http://localhost:5000/api-docs`

---

## 📦 Deployment

This backend is designed to be easily deployable to **Vercel** as a serverless function.
1. The root directory contains `vercel.json` configured to route all traffic to the Express app.
2. In the Vercel dashboard, simply import this repository.
3. Add the `DATABASE_URL` and `JWT_SECRET` to the Vercel Environment Variables.
4. Set the Build Command to `npm run build` (if compiling TS to JS) and Install Command to `npm install`.

---

## 📝 License
This project was built for educational purposes in Programming Hero Level 2. Plagiarism is strictly prohibited.
