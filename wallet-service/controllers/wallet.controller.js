const walletService = require("../services/wallet.service");

exports.addMoney = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;
    const result = await walletService.addMoney({ userId, amount });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getBalance = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const balance = await walletService.getBalance(userId);
    res.json({ balance });
  } catch (err) {
    next(err);
  }
};
