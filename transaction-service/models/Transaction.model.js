const mongoose = require("mongoose");

const TxnSchema = new mongoose.Schema({
  txnId: String,
  userId: String,
  status: String,                          // PENDING / SUCCESS / FAILED / REFUNDED
  amount: { type: Number, required: true},  // 🔥 ADD THIS
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TxnSchema);
