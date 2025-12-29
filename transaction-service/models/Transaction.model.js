const mongoose = require("mongoose");

const TxnSchema = new mongoose.Schema({
  txnId: String,
  userId: String,
  status: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TxnSchema);
