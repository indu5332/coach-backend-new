const mongoose = require("mongoose");
const programDurationService = require("../../service/programDuration.service");
const programDurationModel = require("../../../models/programDuration.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const checkdurationCoverImage = async (req, res, next) => {
  try {
    if (req.body.durationEvent) {
          let newProgram=req.body;
          const formatedProgram=[]
          for (let index = 0; index < newProgram.durationEvent.length; index++) {
            const element = newProgram.durationEvent[index];
            if(element.file.length>0){
              for (let j = 0; j < element.file.length; j++) {
                const felement = element.file[j];
                const file= {
                  url:felement.url,
                  isImage:programDurationService.isImage(felement.url),
                  isVideo:programDurationService.isVideo(felement.url),
                }
                element.file[j]=file;
              }
            }
            formatedProgram.push(element);
          }
          req.body.durationEvent=formatedProgram
      const update = await programDurationModel.updateOne({_id:mongoose.Types.ObjectId(req.params.programDurationId)},
      {
          $set:{
              durationEvent:formatedProgram
          }
      }
      );
      //console.log(update)
      next();
    } else {
      next();
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const checkfile = async (req, res, next) => {
  try {
    if (req.body.durationCoverImage) {
      let durationCoverImage = {
        url: req.body.durationCoverImage.url,
        isImage: programDurationService.isImage(
          req.body.durationCoverImage.url
        ),
        isVideo: programDurationService.isVideo(
          req.body.durationCoverImage.url
        ),
      };
      req.body.durationCoverImage = durationCoverImage;
      const update = await programDurationService.updateprogramDuration(
        { _id: mongoose.Types.ObjectId(req.params.programDurationId) },
        {
          $set: req.body.durationCoverImage,
        }
      );
      next();
    } else {
      next();
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

let updateprogram = async (req, res, next) => {
  try {
    delete req.body.durationEvent;
    delete req.body.durationCoverImage;
    const update = await programDurationService.updateprogramDuration(
      { _id: mongoose.Types.ObjectId(req.params.programDurationId) },
      {
        $set: req.body,
      }
    );
    if (update) {
      update.durationCoverImage.url =
        programDurationService.programDurationImage(
          update.durationCoverImage.url
        );
        await Promise.all(update.durationEvent.map(async programs=>{
            for (let i = 0; i < programs.file.length; i++) {
              const element = programs.file[i];
              element.url= programDurationService.programDurationImage(element.url)
            }
           }))
      return res.status(200).json({
        success: true,
        message: "updated",
        update: update,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "can't update",
      });
    }
  } catch (error) {
    console.log(error);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [checkdurationCoverImage, checkfile, updateprogram];