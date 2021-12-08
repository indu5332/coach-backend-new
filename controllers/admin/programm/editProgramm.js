const mongoose = require("mongoose");
const programService=require('../../service/program.service')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let updateprogram = async (req, res, next) => {
  try {
    const updateRes = await programService.updateProgram(
      { _id: mongoose.Types.ObjectId(req.params.programId) },
      { $set: req.body }
    );
    if (updateRes) {
      return res.status(200).json({
        success: true,
        message: "program updated successfully",
        program: updateRes,
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "fail to update program",
          error: error,
        });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};


module.exports = [updateprogram];