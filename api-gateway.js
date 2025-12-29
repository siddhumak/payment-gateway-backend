const express = require("express");
const connectDB = require("./shared/db");
const authMiddleware = require("./shared/authMiddleware");
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
app.use("/wallet", authMiddleware, require("./wallet-service").routes);
app.use("/payment", authMiddleware, require("./payment-service").routes);
app.use("/transaction", authMiddleware, require("./transaction-service").routes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
