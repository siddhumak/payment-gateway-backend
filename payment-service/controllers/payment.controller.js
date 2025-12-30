const service = require("../services/payment.service");

exports.pay = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, merchantCallback } = req.body;
    const merchantSecret = req.merchant.secret;   // 👈 get secret from middleware

    const data = await service.initiatePayment({
      userId,
      amount,
      merchantCallback,
      merchantSecret
    });

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

