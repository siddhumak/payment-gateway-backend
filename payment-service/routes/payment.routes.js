const router = require("express").Router();
const controller = require("../controllers/payment.controller");

router.post("/pay", controller.pay);

module.exports = router;
