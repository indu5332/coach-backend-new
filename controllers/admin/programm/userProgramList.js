var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
var createError = require("http-errors");

const programList = async (req, res, next) => {
  try {
    const conditions = [
      {
        $match: {
          isPublic: false,
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
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
const total=async(req,res)=>{
  try {
    const find=await programModel.find({isPublic:false})
    console.log(find)
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
        message: "no user programs"
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

module.exports = [programList,total];