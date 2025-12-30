const Txn = require("../../transaction-service/models/Transaction.model");
const Wallet = require("../../wallet-service/models/Wallet.model");

exports.refund = async (req, res, next) => {
  try {
    const { txnId } = req.body;
    if (!txnId) {
      const error = new Error("txnId required");
      error.status = 400;
      throw error;
    }

    const txn = await Txn.findOne({ txnId });
    if (!txn) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }

    if (txn.status !== "SUCCESS") {
      const error = new Error("Refund allowed only for SUCCESS txns");
      error.status = 400;
      throw error;
    }

    const wallet = await Wallet.findOne({ userId: txn.userId });
    wallet.balance += txn.amount;
    await wallet.save();

    txn.status = "REFUNDED";
    await txn.save();

    res.json({
      message: "Refund successful",
      txnId: txn.txnId,
      amount: txn.amount,
      status: txn.status
    });

  } catch (err) {
    next(err);
  }
};
