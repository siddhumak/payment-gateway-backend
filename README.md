# 🏦 Payment Gateway Backend – Node.js Microservices

A simulated **Fintech UPI-style payment backend** using **Node.js, Express, MongoDB, JWT**, now upgraded with **Razorpay test payment integration**.

This backend demonstrates:
- 🔐 User Authentication (JWT Access + Refresh Tokens using Cookies)
- 👛 Wallet System (Add Money, Check Balance, Auto-Update after payments)
- 💳 Payment Service (UPI-style internal payments + Razorpay external payments)
- 🧾 Transaction Logs (PENDING → SUCCESS / FAILED)
- 🏪 Merchant Onboarding (API Keys + Webhook URL)
- 🌐 Webhooks (Simulated using webhook.site for success callback)
- 💸 Refund Simulation (manual API)

---

## 🚀 Tech Stack

| Component | Technology |
|----------|-------------|
| Backend Framework | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT (Access + Refresh Tokens) |
| Architecture | Microservices |
| Deployment | Render + MongoDB Atlas |
| Payment Gateway | Razorpay (Test Mode) |

---

## 📁 Folder Structure

payment-gateway-backend/
├── api-gateway.js # Main API entry
├── shared/ # MongoDB + middlewares
│ ├── db.js
│ ├── authMiddleware.js
│ ├── merchantAuth.js
├── auth-service/
├── wallet-service/
├── payment-service/
│ ├── controllers/
│ │ ├── payment.controller.js
│ │ ├── refund.controller.js
│ │ └── razorpay.controller.js
│ ├── models/
│ ├── routes/
│ │ ├── payment.routes.js
│ │ ├── refund.routes.js
│ │ └── razorpay.routes.js # Razorpay API Route
│ ├── services/
│ ├── payment.service.js
│ ├── razorpay.service.js # Razorpay Service Logic
│ └── index.js
├── transaction-service/
├── merchant-service/
├── .env
├── package.json
└── README.md
