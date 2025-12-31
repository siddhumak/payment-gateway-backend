const router = require("express").Router();
const controller = require("../controllers/razorpay.controller");

router.post("/create-order", controller.createOrder);

module.exports = router;
