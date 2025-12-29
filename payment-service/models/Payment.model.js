const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  txnId: String,
  userId: String,
  amount: Number,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED", "TIMEOUT", "REFUNDED"],
    default: "PENDING"
  },
  timestamp: { type: Date, default: Date.now },
  merchantId: String,
});

module.exports = mongoose.model("Payment", PaymentSchema);
