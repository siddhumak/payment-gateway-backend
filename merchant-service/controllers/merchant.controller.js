const Merchant = require("../models/Merchant.model");
const { v4: uuid } = require("uuid");

exports.register = async (req, res, next) => {
  try {
    const { name, webhookUrl } = req.body;
    if (!name) {
      const error = new Error("Merchant name required");
      error.status = 400;
      throw error;
    }

    const merchant = await Merchant.create({
      name,
      webhookUrl,
      apiKey: uuid(),
      secret: uuid()
    });

    res.json({
      message: "Merchant registered successfully",
      merchantId: merchant._id,
      apiKey: merchant.apiKey,
      secret: merchant.secret,
      webhookUrl: merchant.webhookUrl
    });
  } catch (err) {
    next(err);
  }
};
