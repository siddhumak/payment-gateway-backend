const Txn = require("../models/Transaction.model");

exports.checkStatus = async (txnId) => {
  return await Txn.findOne({ txnId }) || { message: "Not found" };
};
