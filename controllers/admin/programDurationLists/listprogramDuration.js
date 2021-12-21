var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../../models/programDuration.model");
const programDurationService=require('../../service/programDuration.service')
var createError = require("http-errors");
const mongoose=require('mongoose')

const programDurationsList = async (req, res, next) => {
  try {
    const conditions = [
        {
            $match: {
              programId: mongoose.Types.ObjectId(req.params.programId),
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
    let programDurationList = await programDurationModel.aggregate(conditions);
    await Promise.all(programDurationList.map(async programs=>{
      programs.durationCoverImage.url= programDurationService.programDurationImage(programs.durationCoverImage.url)
     }))
     await Promise.all(programDurationList.map(async programs=>{
      for (let i = 0; i < programs.durationEvent.length; i++) {
        const element = programs.durationEvent[i];
        await Promise.all(element.file.map(async program=>{
          program.url=programDurationService.programDurationImage(program.url)
         }))
      }
     }))
     const totalDurationPrograms= await programDurationModel.find({programId: mongoose.Types.ObjectId(req.params.programId)})
     //console.log(programList)
    return res.status(200).json({
      success: true,
      message: "program duration list",
      totalProgramDuration: totalDurationPrograms.length,
      programDurationList: programDurationList,
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [programDurationsList];