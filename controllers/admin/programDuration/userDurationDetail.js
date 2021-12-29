var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../../models/programm.model");
var createError = require("http-errors");
const mongoose=require('mongoose')

//program duration list for users or private program's duration list
const programList = async (req, res, next) => {
  try {
    console.log(req.params.userId)
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
    const programList = await programDurationModel.aggregate(conditions);
    const total = await programDurationModel.find({userId: mongoose.Types.ObjectId(req.params.userId)});
    console.log(programList)
    return res.status(200).json({
        success: true,
        message: "program list",
        totalProgramDuration: total.length,
        programDurationList: programList,
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [programList];