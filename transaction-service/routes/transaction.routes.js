const router = require("express").Router();
const controller = require("../controllers/transaction.controller");

router.get("/status/:txnId", controller.status);

module.exports = router;
