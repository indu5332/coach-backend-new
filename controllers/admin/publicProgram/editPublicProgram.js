const mongoose = require("mongoose");
const programModel=require('../../../models/publicProgram.model')
const programService=require('../../service/program.service')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;


//update program details
const checkCoverFile = async (req, res, next) => {
  try {
    if (req.body.coverfile) {
      for (let i = 0; i < req.body.coverfile.length; i++) {
        const element = req.body.coverfile[i];
        if (programService.isImage(element.url)) {
          await programModel.updateOne(
            {_id:mongoose.Types.ObjectId(req.params.programId),
            "coverfile._id":mongoose.Types.ObjectId(req.body.fileId)},
            {
              $set:{
                "coverfile.$.url":element.url,
                "coverfile.$.isImage":programService.isImage(element.url),
                "coverfile.$.isVideo":programService.isVideo(element.url),
              }
            }
          );
          next()
        } else {
          if (programService.isVideo(element.url)) {
            await programModel.updateOne(
              {_id:mongoose.Types.ObjectId(req.params.programId),"coverfile._id":mongoose.Types.ObjectId(req.body.fileId)},
              {
                $set:{
                  "coverfile.$.url":element.url,
                  "coverfile.$.isImage":programService.isImage(element.url),
                  "coverfile.$.isVideo":programService.isVideo(element.url)
                }
              }
            );
            next()
          } else {
            return res.status(400).json({
              success: true,
              message: "neigther image or video",
              update: update,
            });
          }
        }
      }
    } else {
      next();
    }
  } catch (error) {
    console.log("error",error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const aboutProgramImage = async (req, res, next) => {
  try {
    if (req.body.aboutProgramImage) {
        for (let i = 0; i < req.body.aboutProgramImage.length; i++) {
          const element = req.body.aboutProgramImage[i];
          if (programService.isImage(element.url)) {
            await programModel.updateOne(
              {_id:mongoose.Types.ObjectId(req.params.programId),
              "aboutProgramImage._id":mongoose.Types.ObjectId(req.body.aboutProgramImageId)},
              {
                $set:{
                  "aboutProgramImage.$.url":element.url,
                  "aboutProgramImage.$.isImage":programService.isImage(element.url),
                  "aboutProgramImage.$.isVideo":programService.isVideo(element.url),
                }
              }
            );
            next()
          } else {
            if (programService.isVideo(element.url)) {
              await programModel.updateOne(
                {_id:mongoose.Types.ObjectId(req.params.programId),"aboutProgramImage._id":mongoose.Types.ObjectId(req.body.aboutProgramImageId)},
                {
                  $set:{
                    "aboutProgramImage.$.url":element.url,
                    "aboutProgramImage.$.isImage":programService.isImage(element.url),
                    "aboutProgramImage.$.isVideo":programService.isVideo(element.url)
                  }
                }
              );
              next()
            } else {
              return res.status(400).json({
                success: true,
                message: "neigther image or video",
                update: update,
              });
            }
          }
        }
      } else {
        next();
      }
  } catch (error) {
    console.log("error",error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const descriptionImage = async (req, res, next) => {
    try {
      if (req.body.descriptionImage) {
          for (let i = 0; i < req.body.descriptionImage.length; i++) {
            const element = req.body.descriptionImage[i];
            if (programService.isImage(element.url)) {
              await programModel.updateOne(
                {_id:mongoose.Types.ObjectId(req.params.programId),
                "descriptionImage._id":mongoose.Types.ObjectId(req.body.descriptionImageId)},
                {
                  $set:{
                    "descriptionImage.$.url":element.url,
                    "descriptionImage.$.isImage":programService.isImage(element.url),
                    "descriptionImage.$.isVideo":programService.isVideo(element.url),
                  }
                }
              );
              next()
            } else {
              if (programService.isVideo(element.url)) {
                await programModel.updateOne(
                  {_id:mongoose.Types.ObjectId(req.params.programId),"descriptionImage._id":mongoose.Types.ObjectId(req.body.descriptionImageId)},
                  {
                    $set:{
                      "descriptionImage.$.url":element.url,
                      "descriptionImage.$.isImage":programService.isImage(element.url),
                      "descriptionImage.$.isVideo":programService.isVideo(element.url)
                    }
                  }
                );
                next()
              } else {
                return res.status(400).json({
                  success: true,
                  message: "neigther image or video",
                  update: update,
                });
              }
            }
          }
        } else {
          next();
        }
    } catch (error) {
      console.log("error",error)
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };

let updateprogram = async (req, res, next) => {
  try {
    delete req.body.descriptionImage
    delete req.body.aboutProgramImage
    delete req.body.coverfile
    const update = await programModel.findOneAndUpdate(
      {_id:mongoose.Types.ObjectId(req.params.publicProgramId)},
      {
        $set:req.body
      },{new:true}
    );
    if (update) {
      for (let i = 0; i < update.coverfile.length; i++) {
        const element = update.coverfile[i];
        element.url=await programService.programImage(element.url)
      }
      for (let i = 0; i < update.aboutProgramImage.length; i++) {
        const element = update.aboutProgramImage[i];
        element.url=await programService.programImage(element.url)
      }
      for (let i = 0; i < update.descriptionImage.length; i++) {
        const element = update.descriptionImage[i];
        element.url=await programService.programImage(element.url)
      }
      console.log(update)
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
    console.log("me",error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [checkCoverFile, aboutProgramImage,descriptionImage, updateprogram];