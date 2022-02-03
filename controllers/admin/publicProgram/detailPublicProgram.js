const mongoose = require("mongoose");
const publicProgramModel = require("../../../models/publicProgram.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//find detail for any program
let detailPublicProgram = async (req, res) => {
  try {
    let program = await publicProgramModel.find({
      _id: mongoose.Types.ObjectId(req.params.publicProgramId),
    });
    if (program.length > 0) {
     await Promise.all(program[0].aboutProgramImage.map(async files=>{
        files.url=await programService.programImage(files.url)
     }))
     console.log(program)
     await Promise.all(program[0].coverfile.map(async files=>{
        files.url=await programService.programImage(files.url)
     }))
     await Promise.all(program[0].descriptionImage.map(async files=>{
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

module.exports = [detailPublicProgram];