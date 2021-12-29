const mongoose = require("mongoose");
const programDurationModel = require("../../../models/programDuration.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;


//delete a duration for any program
let deleteDurationProgram = async (req, res, next) => {
  try {
    const deleteProgram = await programDurationModel.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.programDurationId),
    });
    if (deleteProgram.deletedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "program deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to delete program", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [deleteDurationProgram];