const mongoose = require("mongoose");
const programModel=require('../../../models/publicProgram.model')
const programService=require('../../service/program.service')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;


//update program details
const checkCoverFile = async (req, res, next) => {
  try {
    if (req.body.coverfile) {
      const coverfile=[]
      for (let i = 0; i < req.body.coverfile.length; i++) {
        const element = req.body.coverfile[i];
        const coverimage = {
          url: element.url,
          isImage: programService.isImage(element.url),
          isVideo: programService.isVideo(element.url),
        };
        coverfile.push(coverimage)
      }
      req.body.coverfile=coverfile
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.publicProgramId)},{
        $set:{
          "coverfile":req.body.coverfile
        }
      },{new:true})
      next()
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
      const aboutProgramImage=[]
      for (let i = 0; i < req.body.aboutProgramImage.length; i++) {
        const element = req.body.aboutProgramImage[i];
        const coverimage = {
          url: element.url,
          isImage: programService.isImage(element.url),
          isVideo: programService.isVideo(element.url),
        };
        aboutProgramImage.push(coverimage)
      }
      req.body.aboutProgramImage=aboutProgramImage
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.publicProgramId)},{
        $set:{
          "aboutProgramImage":req.body.aboutProgramImage
        }
      },{new:true})
      next()
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
        const descriptionImage=[]
        for (let i = 0; i < req.body.descriptionImage.length; i++) {
          const element = req.body.descriptionImage[i];
          const coverimage = {
            url: element.url,
            isImage: programService.isImage(element.url),
            isVideo: programService.isVideo(element.url),
          };
          descriptionImage.push(coverimage)
        }
        req.body.descriptionImage=descriptionImage
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.publicProgramId)},{
        $set:{
          "descriptionImage":req.body.descriptionImage
        }
      },{new:true})
        next()
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