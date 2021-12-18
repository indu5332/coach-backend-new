var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../../models/programDuration");
const programDurationService=require('../../service/programDuration.service')
var createError = require("http-errors");

const programDurationList = async (req, res, next) => {
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
    let programList = await programDurationModel.aggregate(conditions);
    console.log(programList)
    await Promise.all(programList.map(async programs=>{
      programs.durationCoverImage.url= programDurationService.programDurationImage(programs.durationCoverImage.url)
     }))

     //console.log(programList)
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

module.exports = [programDurationList];