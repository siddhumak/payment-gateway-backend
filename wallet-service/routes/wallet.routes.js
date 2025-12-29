const router = require("express").Router();
const controller = require("../controllers/wallet.controller");

router.post("/add", controller.addMoney);
router.get("/balance", controller.getBalance);

module.exports = router;
