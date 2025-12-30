const Merchant = require("../models/Merchant.model");
const { v4: uuid } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { name, webhookUrl } = req.body;
    if (!name) return res.status(400).json({ message: "Merchant name required" });

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
    res.status(500).json({ message: err.message });
  }
};
