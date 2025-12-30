const service = require("../services/transaction.service");

exports.status = async (req, res, next) => {
  try {
    const result = await service.checkStatus(req.params.txnId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
