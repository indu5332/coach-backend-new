var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");

const programList = async (req, res, next) => {
  try {
    const conditions = [
      {
        $match: {
          isPublic: true,
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

const total=async(req,res)=>{
  try {
    const find=await programModel.find({isPublic:true})
    if(find.length>0){
      return res.status(200).json({
        success: true,
        message: "program list",
        totalPrograms: find.length,
        programList: req.data.programList,
      });
    }
    else{
      return res.status(404).json({
        success: false,
        message: "no public programs"
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

module.exports = [programList,total];