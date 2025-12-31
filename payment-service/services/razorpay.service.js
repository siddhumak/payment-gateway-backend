const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async ({ amount }) => {
  const options = {
    amount: amount * 100, // Razorpay accepts paise
    currency: "INR",
    receipt: "rcpt_" + Date.now()
  };

  const order = await razorpay.orders.create(options);
  return order;
};
