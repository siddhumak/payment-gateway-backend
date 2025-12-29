const walletService = require("../services/wallet.service");

exports.addMoney = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;
    res.json(await walletService.addMoney({ userId, amount }));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getBalance = async (req, res) => {
  const userId = req.user.userId;
  res.json({ balance: await walletService.getBalance(userId) });
};
