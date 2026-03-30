# 🔥 PromptVault - Backend API Server

The strictly validated, entirely secure Express.js Serverless API structure powering the PromptVault internal framework. Engineered explicitly to parse Prisma mappings across PostgreSQL databases handling strict Serverless integrations intrinsically natively on Vercel.

## 🗄️ Backend Technologies

- **Runtime Architecture:** Node.js / Express
- **ORM / Database Model:** Prisma ORM connected to Neon DB (PostgreSQL)
- **Security Checkpoints:** Bcrypt & JSON Web Tokens (JWT) natively mapping RBAC (Role-Based Access Control)
- **Payment Pipeline:** Native Stripe Server configurations blocking invalid constraints before DB injection.
- **Documentation:** Integrated Swagger JSDoc

## 🌐 Live URLs
- **Live Frontend App:** [https://assign-5-promtvault-front.vercel.app/](https://assign-5-promtvault-front.vercel.app/)
- **Live Backend API:** [https://assign-5-promtvault-back.vercel.app/](https://assign-5-promtvault-back.vercel.app/)

## 🚀 Features (Key Functional Integrations)

- **Secure Authentication & Authorization**: Robust JWT system with strict Role Permissions middleware rejecting unauthorized cross-role interactions.
- **Prompt Vault Architecture**: Structured CRUD handling for Sellers to map dynamic frameworks alongside Buyer purchasing channels.
- **Seamless Transactions**: Explicit API endpoints securely parsing Stripe payment intents natively bypassing arbitrary payload mismatches.
- **Aggregated Statistic Engine**: Robust `GET /api/users/statistics` algorithm dynamically extracting role-based aggregations accurately mapped via database relations.
- **Relational Data Storage**: Prisma ORM connected natively to PostgreSQL mapped schemas handling strict database constraints.
- **Integrated Documentation**: Swagger JSDoc implemented to structure and map out native backend interactions.

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
