# 💼 Finvia – Backend API

A full-featured **SaaS Backend System** built using modern web technologies.  
Finvia helps businesses manage **clients, invoices, and payments** efficiently with secure authentication and scalable architecture.

---

## 🚀 Project Overview

Finvia is designed as a **multi-tenant SaaS backend**, where multiple businesses can operate independently.

It supports different user roles — **Owner, Admin, Client, User** — each with controlled access and permissions.

This project focuses on **scalability**, **security**, and **clean API design**, making it suitable for real-world SaaS applications.

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

## 🧰 Tech Stack

---

| Category                   | Technologies                    |
| -------------------------- | ------------------------------- |
| **Backend**                | Node.js, Express.js, TypeScript |
| **Database**               | PostgreSQL                      |
| **ORM**                    | Prisma                          |
| **Authentication**         | JWT (JSON Web Tokens), bcrypt   |
| **Validation**             | Zod                             |
| **API Testing**            | Postman                         |
| **Environment Management** | dotenv                          |
| **Version Control**        | Git & GitHub                    |

---

---

## 🧩 API Endpoints

### 🔐 AUTH MODULE

    ---------------------------------------------------------------------------------------------------
    | METHOD |            ENDPOINT           |           BODY             |      DESCRIPTION          |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/signup           | {                          | Create a new user         |
    |        |                               |  "name": "John Doe",       | registration request.     |
    |        |                               |  "email":"john@example.com"| Sends a 6 digit OTP to    |
    |        |                               | }                          | verify email.             |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/signup-verify    | {                          | Verify user registration  |
    |        |                               |  "otp": "123456"           | using OTP.                |
    |        |                               | }                          |                           |
    |        |                               |                            |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/signup-password  | {                          | Complete user registration|
    |        |                               |  "password": "Abc123@&$",  |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/login            |                            | Login using email and     |
    |        |                               |                            | password                  |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/refresh-token    |                            | Get a new access token    |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/logout           |                            | Logout user (invalidate   |
    |        |                               |                            | token)                    |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/change-password  | {                          | Change user password      |
    |        |                               |  "oldPass": "123...",      |                           |
    |        |                               |  "newPass": "654...",      |                           |
    |        |                               |  "confirmNewPass": "654..."|                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/forgot-password  | {                          | Send reset link to user   |
    |        |                               |  "email":"john@example.com"| email                     |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/auth/reset-passw      | {                          | Reset password using token|
    |        | ord/:id                       |  "newPass":"654...",       |                           |
    |        |                               |  "confirmNewPass":"654..." |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------

### 👤 USER MODULE

    ---------------------------------------------------------------------------------------------------
    | METHOD |            ENDPOINT           |           BODY             |      DESCRIPTION          |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/user                  |                            | Get All Users(Admin Only) |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/user/me               |                            | Get logged-in user profile|
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/user/:id              |                            | Get single user by Id     |
    |        |                               |                            | (Admin Only)              |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/user/edit/:id         | {                          | Update user details.      |
    |        |                               |  "name":"Mark Henry",      |                           |
    |        |                               |  "phone":"+880...",        |                           |
    |        |                               | ...                        |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/user/vehicle-locat    | {                          | Update driver’s vehicle   |
    |        |  ion/:id                      |  "address":"...address"    | location                  |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/user/delete/:id       |                            | Soft delete a user        |
    ---------------------------------------------------------------------------------------------------

### 🏢 BUSINESS MODULE

    ---------------------------------------------------------------------------------------------------
    | METHOD |            ENDPOINT           |           BODY             |      DESCRIPTION          |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/business/add          | {                          | Add your business.        |
    |        |                               |  "name": "Amazon",         |                           |
    |        |                               |  "email":"amz@example.com" |                           |
    |        |                               |  "category":"AGENCY"       |                           |
    |        |                               |   ...                      |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/business/:id          |                            | Get business by Id        |
    |        |                               |                            | (Admin Only)              |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/business/my-business  |                            | Get your business details |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/business/edit/:id     | {                          | Update your business.     |
    |        |                               |  "name": "Amazon",         |                           |
    |        |                               |  "email":"amz@example.com" |                           |
    |        |                               |  "category":"AGENCY"       |                           |
    |        |                               |   ...                      |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/business/delete/:id   |                            | Soft delete business      |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/business/add-authoriry| {                          | Add Owners or Admins      |
    |        |                               |  "name": "Amazon",         |                           |
    |        |                               |  "email":"amz@example.com" |                           |
    |        |                               |  "role":"OWNER" OR "ADMIN" |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/business/join         | {                          | Join as Owners or Admins  |
    |        |                               |  "invitationToken":"eyJ..."|                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------

### 👥 CLIENT MODULE

    ---------------------------------------------------------------------------------------------------
    | METHOD |            ENDPOINT           |           BODY             |      DESCRIPTION          |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/client/add            | {                          | Add new client.           |
    |        |                               |  "name": "John Doe",       |                           |
    |        |                               |  "email":"john@example.com"|                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/client/all            |                            | Get all clients(BUSINESS  |
    |        |                               |                            | OWNER OR ADMIN)           |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/client/:id            |                            | Get your client(BUSINESS  |
    |        |                               |                            | OWNER OR ADMIN)           |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/client/edit/:id       | {                          | Update client details.    |
    |        |                               |  "name":"Mark Henry",      |                           |
    |        |                               |  "phone":"+880...",        |                           |
    |        |                               | ...                        |                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | PATCH  | /api/v1/user/delete/:id       |                            | Soft delete a client      |
    ---------------------------------------------------------------------------------------------------

### 🧾 INVOICE MODULE

    ---------------------------------------------------------------------------------------------------
    | METHOD |            ENDPOINT           |           BODY             |      DESCRIPTION          |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/invoice/create        | {                          | Create invoice.           |
    |        |                               |  "email":"amz@example.com",|                           |
    |        |                               |  "dueDays": 3,             |                           |
    |        |                               |  "items": [                |                           |
    |        |                               |    {                       |                           |
    |        |                               |   "name":"Raymond Sunglass"|                           |
    |        |                               |   "pricePerUnit": 1000,    |                           |
    |        |                               |   "quantity": 2            |                           |
    |        |                               |    }                       |                           |
    |        |                               |           ],               |                           |
    |        |                               |   "taxRate": 25,           |                           |
    |        |                               |   "notes": "First Customer"|                           |
    |        |                               | }                          |                           |
    ---------------------------------------------------------------------------------------------------
    | POST   | /api/v1/invoice/send/:id      |                            | Send invoice              |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/invoice/all           |                            | Get all invoices          |
    ---------------------------------------------------------------------------------------------------
    | GET    | /api/v1/invoice/:id           |                            | Get single invoice        |
    ---------------------------------------------------------------------------------------------------

## ⚙️ Installation & Setup

    ```bash
    # Clone the repository
    git clone https://github.com/NurUddin111/finvia.git

    # Navigate to the project directory
    cd finvia

    # Install dependencies
    npm install

    # Create an .env file
    cp .env.example .env
    # (Add your environment variables)

    # Run database migrations
    npx prisma migrate dev

    # Run the development server
    npm run dev

## 🧪 Testing the API

---

## 📮 Postman Collection

    🔗 **[Finvia  – Postman Collection]()**

    Set the base URL: http://localhost:1126

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

    Email service abstraction
    Webhooks for invoice events
    Activity & audit logs
    Background jobs (queues)
    Subscription & billing plans

👨‍💻 Author

    Muhammad Nur Uddin

    “Don’t be shy, know the why!”
    📧 nuruddinmuhammad38@gmail.com
    🌐 https://github.com/NurUddin111
