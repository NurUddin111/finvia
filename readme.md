# 💼 Finvia – Backend Service

![Live](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Multi-Tenant](https://img.shields.io/badge/Architecture-Multi--Tenant-success?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

A full-featured **SaaS Backend System** built using modern web technologies.  
Finvia helps businesses manage **clients, invoices, and payments** efficiently with secure authentication and scalable architecture.

---

## 🚀 Live Demo
- 🔗 Live Application: https://finvia-finance-management.vercel.app
- 🔗 Frontend Repository: https://github.com/NurUddin111/finvia-finance-management-frontend

---

## 📊 ERD

<img width="2387" height="1080" alt="Finvia_ERD pgerd" src="https://github.com/user-attachments/assets/9ec46960-01df-4746-ab9c-32cfccf6d2f7" />

---

## 💻 Project Overview

Finvia is designed as a **multi-tenant SaaS backend**, where multiple businesses can operate independently.
It supports different user roles — **Owner, Admin, Client, User** — each with controlled access and permissions.
This project focuses on **scalability**, **security**, and **clean API design**, making it suitable for real-world SaaS applications.

---

## 🎯 Problem Statement

Freelancers and small businesses often struggle to manage clients, invoices, payments, and business operations across multiple disconnected tools.

This fragmented workflow can lead to inefficient record keeping, delayed payments, inconsistent client management, and limited visibility into business performance.

Additionally, many existing solutions are either overly complex, expensive, or lack proper multi-business support for growing organizations.

---

## 💡 Solution

Finvia provides a centralized multi-tenant SaaS platform that enables businesses to manage clients, invoices, payments, and team members from a single system.

The platform combines secure authentication, role-based access control, business-level data isolation, and invoice lifecycle management to deliver a scalable solution for modern business operations.

By consolidating essential business workflows into one platform, Finvia helps organizations improve efficiency, maintain data integrity, and streamline financial management.

---

## 🔥 Highlights

- Multi-Tenant SaaS Architecture
- JWT Authentication & Authorization
- Google OAuth Integration
- Role-Based Access Control
- PostgreSQL + Prisma ORM
- Invoice Management System
- Client Management System
- Business Management System
- Secure Cookie Authentication
- Scalable Modular Architecture

---

## ✨ Features

### 👤 User

- Sign up / Log in using JWT authentication
- Email verification using OTP
- Secure access to business-scoped data
- View and update profile information

### 🏢 Business

- Create and manage businesses
- Add and manage business members
- Role-based access control (Admin / Member)
- Business-level data isolation

### 👥 Client

- Create, update, and delete clients
- Search, filter, and paginate clients
- Clients scoped to specific businesses

### 🧾 Invoice

- Create invoices for clients
- Save invoices as draft
- Send invoices
- Update invoice status (Draft → Sent → Paid)
- Calculate totals and due dates

### 🔐 General

- Secure authentication using JWT
- Centralized error handling and validation
- Scalable and modular backend structure
- Soft delete support
  
---

## 🗄 Core Domain Models

- User
- Business
- BusinessAuthority
- BusinessMember
- Client
- Invoice
- InvoiceItem
- InvoicePayment
- Product
  
---

## 🏗 Architecture

- Multi-Tenant SaaS Design
- Business Data Isolation
- JWT Authentication
- Role-Based Access Control
- Prisma ORM
- PostgreSQL Database
- Modular Feature-Based Architecture
- Centralized Error Handling
- Zod Validation

---

## 🏆 Key Achievements

- Built a multi-tenant SaaS backend
- Designed scalable PostgreSQL schema using Prisma
- Implemented JWT and Google OAuth authentication
- Developed role-based access control system
- Built invoice lifecycle management workflows
- Implemented secure business-level data isolation
- Created modular API architecture with TypeScript
  
---

## 📚 API Documentation

Finvia exposes RESTful APIs for authentication, business management, client management, and invoice management.

### Available Modules

* Authentication
* Users
* Businesses
* Clients
* Invoices

For complete endpoint documentation, see:

📖 [API Documentation](./docs/api.md)

### API Base URL

```txt
/api/v1
```
---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/NurUddin111/finvia-finance-management-backend.git
  
# Navigate to the project directory
cd finvia-finance-management-backend
  
# Install dependencies
npm install
  
# Create an .env file
cp .env.example .env
# (Add your environment variables)
  
# Run database migrations
npx prisma migrate dev
  
# Run the development server
npm run dev
```
---

## 🧪 Testing the API

### 📮 Postman Collection
- [Download Postman Collection](./postman/Finvia.postman_collection.json)
- Set the base URL: http://localhost:1126

---

## 📁 Folder Structure

    src/
    │
    ├── app/
    │   ├── config/
    │   ├── errorHelpers/
    │   ├── helpers/
    │   ├── interfaces/
    │   ├── middlewares/
    │   ├── modules/
    │   ├── routes/
    │   ├── utils/
    │   └── constants.ts
    ├── prisma/
    │ ├── schema.prisma
    │ └── migrations/
    │
    ├── app.ts
    └── server.ts

## 🧠 Future Improvements

- Email service abstraction
- Webhooks for invoice events
- Activity & audit logs
- Background jobs (queues)
- Subscription & billing plans

## 👨‍💻 Author

**Muhammad Nur Uddin**

Backend-Focused Full-Stack Developer

📧 Email: muhammadnur.codes@gmail.com

🌐 [Portfolio](https://muhammad-nur-uddin.vercel.app)

💼 [LinkedIn](https://www.linkedin.com/in/muhammad-nur-uddin)

🐙 [GitHub](https://github.com/NurUddin111)

> "Don't be shy, know the why!"
