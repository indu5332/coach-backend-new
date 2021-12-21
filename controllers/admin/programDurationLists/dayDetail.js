var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../../models/programDuration.model");
const programDurationService=require('../../service/programDuration.service')
var createError = require("http-errors");
const mongoose=require('mongoose')

const programList = async (req, res, next) => {
  try {
    const conditions = [
        { 
            $match: {
              programId: mongoose.Types.ObjectId(req.params.programId),
            }
          },
      {
        $sort: {
          day: 1,
        },
      }
    ];
    let programDurationList = await programDurationModel.aggregate(conditions);
     for (let i = 0; i < programDurationList.length; i++) {
       const element = programDurationList[i];
       if(req.params.day==element.day){
       return res.status(200).json({
         success: true,
         message: "program for the day",
         programDurationList: element,
       });
       }
     }
     return res.status(400).json({
      success: false,
      message: "no program for the day",
      next:false
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [programList];