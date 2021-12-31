const mongoose = require("mongoose");
const programDurationService = require("../../service/programDuration.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//detail for program duration
let detailProgram = async (req, res, next) => {
  try {
    let program = await programDurationService.findprogramDuration({
      _id: mongoose.Types.ObjectId(req.params.programDurationId),
    });
    if (program.length > 0) {
      program[0].durationCoverImage.url =
        programDurationService.programDurationImage(
          program[0].durationCoverImage.url
        );
      await Promise.all(
        program[0].durationEvent.map(async (programs) => {
          for (let i = 0; i < programs.file.length; i++) {
            const element = programs.file[i];
            element.url = programDurationService.programDurationImage(
              element.url
            );
          }
        })
      );
      return res
        .status(200)
        .json({
          success: true,
          message: "program details",
          program: program[0],
        });
    } else {
      return res
        .status(404)
        .json({ message: "no program found", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [detailProgram];
