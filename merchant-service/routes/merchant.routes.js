const router = require("express").Router();
const controller = require("../controllers/merchant.controller");

router.post("/onboard", controller.register);

module.exports = router;
