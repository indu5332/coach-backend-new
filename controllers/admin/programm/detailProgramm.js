const mongoose = require("mongoose");
const programModel = require("../../../models/programm.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let detailPRogram = async (req, res, next) => {
  try {
    const program = await programModel.find({
      _id: mongoose.Types.ObjectId(req.params.programId),
    });
    console.log(req.params.programId);
    if (program.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "program details" ,program:program[0]});
    } else {
      return res
        .status(404)
        .json({ message: "no program found", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [detailPRogram];
