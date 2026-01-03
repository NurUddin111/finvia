Finvia – Backend Service

Finvia is a modern SaaS platform designed to manage businesses, clients, invoices, and payments efficiently.
This repository contains the backend service responsible for authentication, business logic, data persistence, and secure API access.

🧠 Overview

The backend is built with scalability, security, and maintainability in mind.
It follows a modular architecture, supports role-based access control, and is designed to serve multiple businesses (multi-tenant SaaS).

🛠 Tech Stack

Node.js – Runtime environment

Express.js – HTTP server framework

TypeScript – Type safety & maintainable code

PostgreSQL – Primary relational database

Prisma ORM – Database modeling & querying

JWT – Authentication & authorization

Zod – Request validation

bcrypt – Password hashing

dotenv – Environment variable management

📁 Project Structure
src/
├── app/
│ ├── modules/
│ │ ├── auth/
│ │ ├── user/
│ │ ├── business/
│ │ ├── client/
│ │ ├── invoice/
│ │ └── payment/
│ ├── middlewares/
│ ├── routes/
│ └── utils/
├── prisma/
│ ├── schema.prisma
│ └── migrations/
├── config/
├── app.ts
└── server.ts

🔐 Authentication & Authorization

JWT-based authentication

Secure access token handling

Role-based authorization:

SUPER_ADMIN

ADMIN

USER

Protected routes using middleware

Business-scoped access control (multi-tenant safety)

🏢 Core Modules
Auth Module

User registration & login

Email-based verification (OTP)

Token generation & validation

User Module

User profile management

Role assignment

Soft delete support

Business Module

Business creation & management

Business members

Business-scoped data isolation

Client Module

Client CRUD operations

Search, filter, pagination

Business-specific clients

Invoice Module

Invoice creation & updates

Draft / Sent / Paid status handling

Due date & total calculations

Payment Module

Invoice payment tracking

Payment status updates

Future gateway integration ready

📦 Environment Variables

Create a .env file in the root directory:

NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://user:password@localhost:5432/finvia

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

🚀 Getting Started
1️⃣ Install Dependencies
npm install

2️⃣ Setup Database
npx prisma migrate dev
npx prisma generate

3️⃣ Run Development Server
npm run dev

Server will start on:

http://localhost:5000

🧪 API Standards

RESTful API design

Consistent response format:

{
"success": true,
"message": "Operation successful",
"data": {}
}

Centralized error handling

Proper HTTP status codes

🔒 Security Practices

Password hashing with bcrypt

JWT expiration & rotation support

Input validation using Zod

Soft deletes instead of hard deletes

Business-level data isolation

📈 Scalability Considerations

Modular architecture

Clean service–controller separation

Database-indexed filtering & searching

Ready for microservice split in future

API versioning friendly

🧭 Future Improvements

Payment gateway integration

Email service abstraction

Audit logs

Rate limiting

Webhook support

Background jobs (queues)

👨‍💻 Maintained By

Muhammad Nur Uddin
Backend & Full-Stack Developer
Project: Finvia
