var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
const programService=require('../../service/program.service')
const config=require('config')
var createError = require("http-errors");
const mongoose=require('mongoose')

//user program list
const programList = async (req, res) => {
  try {
    const conditions = [
        {
            $match: {
                userId: mongoose.Types.ObjectId(req.decoded._id),
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
    const programList = await programModel.aggregate(conditions);
    await Promise.all(programList.map(async program=>{
      program.pdfUrl=config.fileUrl+"/programs/"+program.pdfUrl
  }))
   
  await Promise.all(programList.map(async programs=>{
    programs.coverfile.url= programService.programImage(programs.coverfile.url)
   }))

   await Promise.all(programList.map(async programs=>{
    for (let i = 0; i < programs.file.length; i++) {
      const element = programs.file[i];
      element.url= programService.programImage(element.url)
    }
   }))
   const totalPrograms= await programModel.find({userId: mongoose.Types.ObjectId(req.decoded._id)})
    return res.status(200).json({
        success: true,
        message: "program list",
        totalPrograms: totalPrograms.length,
        programList: programList,
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [programList];