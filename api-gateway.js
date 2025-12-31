const express = require("express");
const connectDB = require("./shared/db");
const authMiddleware = require("./shared/authMiddleware");
const merchantAuth = require("./shared/merchantAuth");
const errorHandler = require("./shared/errorHandler");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// connect MongoDB
connectDB();

// test route
app.get("/", (req, res) => {
  res.json({ message: "Payment Gateway API Live 🚀" });
});

// register microservice modules

app.use("/auth", require("./auth-service").routes);

// Merchant onboarding should NOT require auth
app.use("/merchant", require("./merchant-service").routes);

// Wallet - requires user login
app.use("/wallet", authMiddleware, require("./wallet-service").routes);

// Payment - requires BOTH: user login + merchant validation
app.use("/payment", authMiddleware, merchantAuth, require("./payment-service").routes);

// Razorpay routes (ONLY: logged-in + merchant)
app.use(
  "/razorpay",
  authMiddleware,
  merchantAuth,
  require("./payment-service/routes/razorpay.routes")
);

// Transaction - user can check only their own transactions
app.use("/transaction", authMiddleware, require("./transaction-service").routes);


app.use(errorHandler);
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
