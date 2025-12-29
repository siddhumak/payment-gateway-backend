const Wallet = require("../models/Wallet.model");

exports.addMoney = async ({ userId, amount }) => {
  await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { upsert: true, new: true }
  );
  return { message: "Money added to wallet" };
};

exports.getBalance = async (userId) => {
  const wallet = await Wallet.findOne({ userId });
  return wallet?.balance || 0;
};
