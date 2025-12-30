const Merchant = require("../merchant-service/models/Merchant.model");

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];   // Merchant must send API key in header

    if (!apiKey) return res.status(401).json({ message: "Merchant API key required" });

    const merchant = await Merchant.findOne({ apiKey });
    if (!merchant) return res.status(403).json({ message: "Invalid merchant API key" });

    req.merchant = merchant; // attach merchant object to request
    next();
  } catch (err) {
    res.status(500).json({ message: "Merchant auth error" });
  }
};
