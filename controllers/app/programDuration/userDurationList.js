var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../../models/programDuration.model");
const programDurationService = require("../../service/programDuration.service");
var createError = require("http-errors");
const mongoose = require("mongoose");

//program duration list for user
const programDurationList = async (req, res, next) => {
  try {
    const conditions = [
      {
        $match: {
          programId: mongoose.Types.ObjectId(req.params.programId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip:
          (req.query.page ? Number(req.query.page) : 0) *
          (req.query.limit ? Number(req.query.limit) : 10),
      },
      {
        $limit: req.query.limit ? Number(req.query.limit) : 10,
      },
    ];
    let programList = await programDurationModel.aggregate(conditions);
    console.log(programList)
    await Promise.all(
      programList.map(async (programs) => {
        programs.durationCoverImage.url =
          programDurationService.programDurationImage(
            programs.durationCoverImage.url
          );
      })
    );
    await Promise.all(
      programList.map(async (programs) => {
        for (let i = 0; i < programs.durationEvent.length; i++) {
          const element = programs.durationEvent[i];
          await Promise.all(
            element.file.map(async (program) => {
              program.url = programDurationService.programDurationImage(
                program.url
              );
            })
          );
        }
      })
    );
    const totalPrograms = await programDurationModel.find({
      programId: mongoose.Types.ObjectId(req.params.programId),
    });
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

module.exports = [programDurationList];
