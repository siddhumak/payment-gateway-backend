const service = require("../services/transaction.service");

exports.status = async (req, res) => {
  res.json(await service.checkStatus(req.params.txnId));
};
