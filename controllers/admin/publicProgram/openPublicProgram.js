var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/publicProgram.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");


//open public programs list 
const programList = async (req,res, next) => {
  try {
    const conditions = [
      {
        $match: {
          isClose:false
        }
      },
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
     req.data={}
    req.data.programList=programList
    next()
    
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const total=async(req,res)=>{
  try {
    const find=await programModel.find({isClose:false})
      return res.status(200).json({
        success: true,
        message: "program list",
        totalPrograms: find.length,
        programList: req.data.programList,
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

module.exports = [programList,total];``