const mongoose = require("mongoose");
const programService = require("../../service/program.service");
const programModel=require('../../../models/programm.model')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const checkCoverFile = async (req, res, next) => {
  try {
    if (req.body.file) {
      for (let i = 0; i < req.body.file.length; i++) {
        const element = req.body.file[i];
        if (programService.isImage(element.url)) {
          const update=await programModel.updateOne(
            {_id:mongoose.Types.ObjectId(req.params.programId),
            "file._id":mongoose.Types.ObjectId(req.body.fileId)},
            {
              $set:{
                "file.$.url":element.url,
                "file.$.isImage":programService.isImage(element.url),
                "file.$.isVideo":programService.isVideo(element.url),
              }
            }
          );
          console.log(update)
          next()
        } else {
          if (programService.isVideo(element.url)) {
            const update=await programModel.updateOne(
              {_id:mongoose.Types.ObjectId(req.params.programId),"file._id":mongoose.Types.ObjectId(req.body.fileId)},
              {
                $set:{
                  "file.$.url":element.url,
                  "file.$.isImage":programService.isImage(element.url),
                  "file.$.isVideo":programService.isVideo(element.url)
                }
              }
            );
            console.log(update)
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
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const checkfile = async (req, res, next) => {
  try {
    if (req.body.coverfile) {
      let coverfile = {
        url: req.body.coverfile.url,
        isImage: programService.isImage(req.body.coverfile.url),
        isVideo: programService.isVideo(req.body.coverfile.url),
      };
      req.data={}
      req.data.coverfile=coverfile
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
    if(req.body.coverfile){
      req.body.coverfile=req.data.coverfile
    }
    delete req.body.file
    const update = await programService.updateProgram(
      {_id:mongoose.Types.ObjectId(req.params.programId)},
      {
        $set:req.body
      }
    );
    if (update) {
      update.coverfile.url=programService.programImage(update.coverfile.url)
      for (let i = 0; i < update.file.length; i++) {
        const element = update.file[i];
        element.url=programService.programImage(element.url)
        
      }
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
    console.log(error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [checkCoverFile, checkfile, updateprogram];