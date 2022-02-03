const mongoose = require("mongoose");
const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//find detail for any program
let detailPRogram = async (req, res) => {
  try {
    let program = await programService.findprogram({
      _id: mongoose.Types.ObjectId(req.params.programId),
    });
    if (program.length > 0) {
      program[0].coverfile.url=await programService.programImage(program[0].coverfile.url)
      program[0].pdfUrl=await programService.programImage(program[0].pdfUrl)
      program[0].video=await programService.programImage(program[0].video)
     await Promise.all(program[0].file.map(async files=>{
        files.url=await programService.programImage(files.url)
     }))
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