const service = require("../services/payment.service");

exports.pay = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { amount, merchantCallback } = req.body;
    const merchantSecret = req.merchant.secret;

    const data = await service.initiatePayment({
      userId,
      amount,
      merchantCallback,
      merchantSecret
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};
