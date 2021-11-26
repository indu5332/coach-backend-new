const mongoose = require("mongoose");
const programmModel = require("../../../models/programm.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let updateprogram = async (req, res, next) => {
  try {
    const updateRes = await programmModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.programId) },
      { $set: req.body }
    );
    if (updateRes.modifiedCount > 0) {
      next();
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

const findPogram = async (req, res) => {
  try {
    const program = await programmModel.find({
      _id: mongoose.Types.ObjectId(req.params.programId),
    });
    if (!program || program.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No program exits" });
    }
    return res.status(200).json({
      success: true,
      message: "program updated successfully",
      program: program,
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [updateprogram, findPogram];
