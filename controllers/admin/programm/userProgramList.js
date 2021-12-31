var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
const programService=require("../../service/program.service")
var createError = require("http-errors");
const mongoose=require('mongoose')

//program list fo specific user
const programList = async (req, res) => {
  try {
    const conditions = [
        {
            $match: {
                userId: mongoose.Types.ObjectId(req.params.userId),
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
    await Promise.all(programList.map(async programs=>{
      programs.coverfile.url= programService.programImage(programs.coverfile.url)
      programs.pdfUrl=programService.programImage(programs.pdfUrl)
     }))
     await Promise.all(programList.map(async programs=>{
      for (let i = 0; i < programs.file.length; i++) {
        const element = programs.file[i];
        element.url= programService.programImage(element.url)
      }
     }))
    const total = await programModel.find({userId: mongoose.Types.ObjectId(req.params.userId)});
    return res.status(200).json({
        success: true,
        message: "program list",
        totalPrograms: total.length,
        programList: programList,
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [programList];