const service = require("../services/razorpay.service");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount required" });

    const order = await service.createOrder({ amount });
    return res.json({ success: true, order });

  } catch (err) {
    console.log("Razorpay error:", err.message);
    return res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};
