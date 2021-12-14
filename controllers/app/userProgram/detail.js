const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const mongoose = require("mongoose");

let detailuserProgram = async (req, res, next) => {
  try {
    let userProgram = await programService.findprogram({
      _id: mongoose.Types.ObjectId(req.params.programId),
    });
    if (userProgram.length > 0) {
      if (userProgram[0].userId === req.decoded._id) {
        userProgram.pdfUrl=await programService.programImage(userProgram.pdfUrl)
        return res.status(200).json({
            success: true,
            message: "userProgram details",
            userProgram: userProgram[0],
          });
      } else {
        return res
          .status(404)
          .json({ message: "no user for this program found", success: false });
      }
    } else {
      return res.status(404).json({ message: "no details found", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = detailuserProgram;
