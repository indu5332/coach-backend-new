const programDurationService = require("../../service/programDuration.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const mongoose = require("mongoose");

//detail for duration 
let detailProgramDuration = async (req, res, next) => {
  try {
    let userProgramDuration = await programDurationService.findprogramDuration({
      _id: mongoose.Types.ObjectId(req.params.programDurationId),
    });
    if (userProgramDuration.length > 0) {
        userProgramDuration = JSON.parse(JSON.stringify(userProgramDuration[0]));
        userProgramDuration.durationCoverImage.url = programDurationService.programDurationImage(
          userProgramDuration.durationCoverImage.url
        );
        await Promise.all(userProgramDuration.durationEvent.map(async programs=>{
            for (let i = 0; i < programs.file.length; i++) {
              const element = programs.file[i];
              element.url= programDurationService.programDurationImage(element.url)
            }
           }))
        return res.status(200).json({
          success: true,
          message: "userProgramDuration details",
          userProgramDuration: userProgramDuration,
        });
      } else {
        return res
          .status(404)
          .json({ message: "no user for this program found", success: false });
      }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = detailProgramDuration;
