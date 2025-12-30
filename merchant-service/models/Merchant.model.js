const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true },
  secret: { type: String, required: true },
  webhookUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Merchant", MerchantSchema);
