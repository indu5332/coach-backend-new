const mongoose = require("mongoose");
const programDurationModel = require("../../../models/programDuration.model");
const programDurationService = require("../../service/programDuration.service");

//remove new file from program duration 
const createProgram = async (req, res, next) => {
  try {
    const update = await programDurationModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.programDurationId),
        "durationEvent._id": mongoose.Types.ObjectId(req.body.durationEventId),
      },
      {
        $pull: {
            "durationEvent.$.file":{
                _id:mongoose.Types.ObjectId(req.body.fileId)
            }
        },
      }
    );
    console.log(update);
    update.durationCoverImage.url =
      programDurationService.programDurationImage(
        update.durationCoverImage.url
      );
    await Promise.all(
      update.durationEvent.map(async (programs) => {
        for (let i = 0; i < programs.file.length; i++) {
          const element = programs.file[i];
          element.url = programDurationService.programDurationImage(
            element.url
          );
        }
      })
    );
    return res.status(200).json({
      success: true,
      message: "file removed successfully",
      program: update,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = [createProgram];