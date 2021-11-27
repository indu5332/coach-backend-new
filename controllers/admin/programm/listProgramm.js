var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../../models/programm.model");
var createError = require("http-errors");

const programList = async (req, res, next) => {
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
    const programList = await programModel.aggregate(conditions);
    req.data = {};
    req.data.programList = programList;
    next();
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const totalProgram = async (req, res) => {
  try {
    const totalPrograms = await programModel.find({});
    return res.status(200).json({
      success: true,
      message: "program list",
      totalPrograms: totalPrograms.length,
      programList: req.data.programList,
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [programList, totalProgram];
