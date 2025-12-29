const Payment = require("../models/Payment.model");
const Wallet = require("../../wallet-service/models/Wallet.model");     // FIX HERE
const { v4: uuid } = require("uuid");
const axios = require("axios");
const Txn = require("../../transaction-service/models/Transaction.model"); 

exports.initiatePayment = async ({ userId, amount, merchantCallback }) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < amount)
    throw new Error("Insufficient wallet balance");

  // deduct amount
  wallet.balance -= amount;
  await wallet.save();

  const txnId = uuid();

  // create payment + txn record
  await Payment.create({ txnId, userId, amount, status: "PENDING", merchantId: "merchant01" });
  await Txn.create({ txnId, userId, status: "PENDING" });

  // async update success + callback
  setTimeout(async () => {
    await Txn.findOneAndUpdate({ txnId }, { status: "SUCCESS" });

    if (merchantCallback) {
      axios.post(merchantCallback, { txnId, status: "SUCCESS" }).catch(() => {});
    }
  }, 2000);

  return { txnId, status: "PENDING" };
};
