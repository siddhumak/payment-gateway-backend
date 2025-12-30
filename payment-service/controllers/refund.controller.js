const Txn = require("../../transaction-service/models/Transaction.model");
const Wallet = require("../../wallet-service/models/Wallet.model");

exports.refund = async (req, res) => {
  try {
    const { txnId } = req.body;
    if (!txnId) return res.status(400).json({ message: "txnId required" });

    const txn = await Txn.findOne({ txnId });
    if (!txn) return res.status(404).json({ message: "Transaction not found" });

    if (txn.status !== "SUCCESS")
      return res.status(400).json({ message: "Refund allowed only for SUCCESS txns" });

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
    res.status(500).json({ error: err.message });
  }
};
