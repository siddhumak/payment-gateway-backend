const service = require("../services/payment.service");

exports.pay = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, merchantCallback } = req.body;
    res.json(await service.initiatePayment({ userId, amount, merchantCallback }));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
