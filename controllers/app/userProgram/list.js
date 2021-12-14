var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
const programService=require('../../service/program.service')
var createError = require("http-errors");
const mongoose=require('mongoose')

const programList = async (req, res, next) => {
  try {
    console.log(req.params.userId)
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
    programList.pdfUrl=await programService.programImage(programList.pdfUrl)
    console.log(programList)
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
module.exports = [programList];