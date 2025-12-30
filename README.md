# 🏦 Payment Gateway Backend – Node.js Microservices

A simulated UPI-style fintech payment backend built using **Node.js, Express, MongoDB, JWT Authentication**, following a **microservice pattern**.

This project demonstrates:
- User Authentication (JWT Access + Refresh Tokens using Cookies)
- Wallet System (Add Money, Check Balance)
- Payment Service (Initiate payment, deduct balance)
- Transaction Logs (PENDING → SUCCESS / FAILED)
- Merchant Onboarding (API Keys + Webhook URL)
- Webhook Callback Simulation (test using webhook.site)
- Refund Flow (manual)

---

## 🚀 Tech Stack
| Component | Tech |
|----------|------|
| Backend Framework | Node.js + Express |
| Database | MongoDB (MongoDB Atlas recommended) |
| Auth | JWT (Access + Refresh Token) |
| Architecture | Microservices |
| Deployment Ready | Render + MongoDB Atlas |

---

## 📁 Folder Structure

payment-gateway-backend/
├── api-gateway.js # Gateway entry file
├── shared/ # DB + middlewares
├── auth-service/
├── wallet-service/
├── payment-service/
├── transaction-service/
├── merchant-service/
├── .env.example
├── README.md
├── package.json