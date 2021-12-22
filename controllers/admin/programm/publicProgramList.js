var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");

const publicProgramList = async (req, res, next) => {
  try {
    const conditions = [
      {
        $match: {
          isPublic: true,
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
      programs.coverfile.url= programService.programImage(programs.coverfile.url)
      programs.pdfUrl=programService.programImage(programs.pdfUrl)
     }))

     await Promise.all(programList.map(async programs=>{
      for (let i = 0; i < programs.file.length; i++) {
        const element = programs.file[i];
        element.url= programService.programImage(element.url)
        console.log(element.url)
      }
     }))
     req.data={}
    req.data.programList=programList
    next()
     console.log(programList)
    
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const totalPublicPrograms=async(req,res)=>{
  try {
    const find=await programModel.find({isPublic:true})
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

module.exports = [publicProgramList,totalPublicPrograms];