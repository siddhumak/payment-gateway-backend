const router = require("express").Router();
const controller = require("../controllers/payment.controller");
const refundController = require("../controllers/refund.controller");

router.post("/pay", controller.pay);
router.post("/refund", refundController.refund);
module.exports = router;
