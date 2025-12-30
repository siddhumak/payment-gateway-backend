const Payment = require("../models/Payment.model");
const Wallet = require("../../wallet-service/models/Wallet.model");
const { v4: uuid } = require("uuid");
const axios = require("axios");
const Txn = require("../../transaction-service/models/Transaction.model");
const crypto = require("crypto");

exports.initiatePayment = async ({ userId, amount, merchantCallback, merchantSecret }) => {
  // 1️⃣ Check wallet balance
  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  // 2️⃣ Deduct balance immediately
  wallet.balance -= amount;
  await wallet.save();

  // 3️⃣ Generate txnId
  const txnId = uuid();

  // 4️⃣ Create payment + transaction record
  await Payment.create({
    txnId,
    userId,
    amount,
    status: "PENDING",
    merchantId: "merchant01"
  });

  await Txn.create({
    txnId,
    userId,
    status: "PENDING",
    amount,
    timestamp: new Date()
  });

  // 5️⃣ Simulate async payment processing
  setTimeout(async () => {
    try {
      // RANDOM SUCCESS / FAILURE (80% success)
      const success = Math.random() > 0.2;

      // Prepare payload for webhook
      const payload = {
        txnId,
        amount,
        userId,
        status: success ? "SUCCESS" : "FAILED"
      };

      // 📌 Generate HMAC SHA256 Signature using merchant secret
      const signature = crypto
        .createHmac("sha256", merchantSecret)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (!success) {
        await Txn.findOneAndUpdate({ txnId }, { status: "FAILED" });

        // 🔴 Send webhook FAILED
        if (merchantCallback) {
          axios.post(merchantCallback, payload, {
            headers: { "x-webhook-signature": signature }
          }).catch(() => {});
        }
        return;
      }

      // 🟢 SUCCESS CASE
      await Txn.findOneAndUpdate({ txnId }, { status: "SUCCESS" });

      // 🔔 Send webhook SUCCESS
      if (merchantCallback) {
        axios.post(merchantCallback, payload, {
          headers: { "x-webhook-signature": signature }
        }).catch(() => {});
      }

    } catch (err) {
      console.log("Webhook / DB update error:", err.message);
    }
  }, 2000);

  // Initial response sent to user -> still pending
  return { txnId, status: "PENDING" };
};
