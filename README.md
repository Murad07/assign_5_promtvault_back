# 🔥 PromptVault - Backend API Server

The strictly validated, entirely secure Express.js Serverless API structure powering the PromptVault internal framework. Engineered explicitly to parse Prisma mappings across PostgreSQL databases handling strict Serverless integrations intrinsically natively on Vercel.

## 🗄️ Backend Technologies

- **Runtime Architecture:** Node.js / Express
- **ORM / Database Model:** Prisma ORM connected to Neon DB (PostgreSQL)
- **Security Checkpoints:** Bcrypt & JSON Web Tokens (JWT) natively mapping RBAC (Role-Based Access Control)
- **Payment Pipeline:** Native Stripe Server configurations blocking invalid constraints before DB injection.
- **Documentation:** Integrated Swagger JSDoc

## 🚀 Key Functional Integrations
- **Role Permissions Middleware:** Express strictly rejects Seller logic from Buyers, and natively prevents generic configurations traversing Admin APIs.
- **Seamless Transactions:** Explicit API endpoints securely parsing Stripe payment intents bypassing arbitrary payload mismatches intrinsically.
- **Aggregated Statistic Engine:** Robust `GET /api/users/statistics` algorithm dynamically extracting different aggregations exactly mapped down through native Role evaluation states.

## ⚙️ Local Server Setup 

```bash
npm install
npm run dev
```

Remember to bind the environment `.env` correctly resolving the Database layer native connections:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@neon.tech/promptvault?sslmode=require
JWT_SECRET=super_secret_jwt_key
STRIPE_SECRET_KEY=sk_test_...
```

If resetting your Server manually natively re-inject the Database structural map explicitly:
```bash
npx prisma db push
npx prisma generate
```

## 🛡️ Seeding Super Admin
Executing `npm run db:seed` natively writes this profile permanently bypassing generic creation rules:
- **Email:** `admin@promptvault.com`
- **Password:** `admin123`
