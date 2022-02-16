const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const mongoose = require("mongoose");

//detail for user program
let detailuserProgram = async (req, res) => {
  try {
    let userProgram = await programService.findprogram({
      _id: mongoose.Types.ObjectId(req.params.programId),
      userId: mongoose.Types.ObjectId(req.decoded._id)
    });
    if (userProgram.length > 0) {
        userProgram = JSON.parse(JSON.stringify(userProgram[0]));
        userProgram.pdfUrl = await programService.programImage(
          userProgram.pdfUrl
        );
        userProgram.video = await programService.programImage(
          userProgram.video
        );
        userProgram.coverfile.url =await programService.programImage(
          userProgram.coverfile.url
        );
        await Promise.all(
          userProgram.file.map(async (files) => {
            files.url =await programService.programImage(files.url);
          })
        );
        await Promise.all(
          userProgram.events.map(async (event) => {
            event.url =await programService.programImage(event.url);
          })
        );
        return res.status(200).json({
          success: true,
          message: "userProgram details",
          userProgram: userProgram,
        });
    } else {
      return res
        .status(404)
        .json({ message: "no details found", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = detailuserProgram;