var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/publicProgram.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");

//public programs list open/closed 
const publicProgramList = async (req,res, next) => {
  try {
    const conditions = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: ((req.query.page ? Number(req.query.page) : 0) * (req.query.limit ? Number(req.query.limit) : 10)),
      },
      {
        $limit: (req.query.limit ? Number(req.query.limit) : 10),
      },
    ];
    let programList = await programModel.aggregate(conditions);
    await Promise.all(programList.map(async programs=>{
      for (let i = 0; i < programs.aboutProgramImage.length; i++) {
        const element = programs.aboutProgramImage[i];
        element.url=await programService.programImage(element.url)
      }
      for (let i = 0; i < programs.coverfile.length; i++) {
        const element = programs.coverfile[i];
        element.url=await programService.programImage(element.url)
      }
      for (let i = 0; i < programs.descriptionImage.length; i++) {
        const element = programs.descriptionImage[i];
        element.url=await programService.programImage(element.url)
      }
     }))
      return res.status(200).json({
        success: true,
        message: "program list",
        totalPrograms: programList.length,
        programList: programList,
      });
    
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};


module.exports = [publicProgramList];