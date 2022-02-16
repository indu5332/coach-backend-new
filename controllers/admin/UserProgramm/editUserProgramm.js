const mongoose = require("mongoose");
const programService = require("../../service/program.service");
const programModel=require('../../../models/programm.model')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;


//update program details
const checkCoverFile = async (req, res, next) => {
  try {
    if (req.body.file) {
      const file=[]
      for (let i = 0; i < req.body.file.length; i++) {
        const element = req.body.file[i];
        const coverimage = {
          url: element.url,
          isImage: programService.isImage(element.url),
          isVideo: programService.isVideo(element.url),
        };
        file.push(coverimage)
      }
      req.body.file=file
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.programId)},{
        $set:{
          "file":req.body.file
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

const checkEvents = async (req, res, next) => {
  try {
    if (req.body.events) {
      const events=[]
      for (let i = 0; i < req.body.events.length; i++) {
        const element = req.body.events[i];
        const event = {
          eventName:element.eventName,
          eventDescription:element.eventDescription,
          url: element.url,
          isImage: programService.isImage(element.url),
          isVideo: programService.isVideo(element.url),
        };
        events.push(event)
      }
      req.body.events=events
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.programId)},{
        $set:{
          "events":req.body.events
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

const checkfile = async (req, res, next) => {
  try {
    if (req.body.coverfile) {
      let coverfile = {
        url: req.body.coverfile.url,
        isImage: programService.isImage(req.body.coverfile.url),
        isVideo: programService.isVideo(req.body.coverfile.url),
      };
      req.body.coverfile=coverfile
      const update=await programModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.programId)},{
        $set:{
          "coverfile":req.body.coverfile
        }
      },{new:true})
      next();
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
    delete req.body.coverfile
    delete req.body.file
    delete req.body.events
    const update = await programService.updateProgram(
      {_id:mongoose.Types.ObjectId(req.params.programId)},
      {
        $set:req.body
      }
    );
    if (update) {
      update.coverfile.url=await programService.programImage(update.coverfile.url)
      update.video=await programService.programImage(update.video)
      for (let i = 0; i < update.file.length; i++) {
        const element = update.file[i];
        element.url=await programService.programImage(element.url)
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
    console.log("me",error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [checkCoverFile, checkEvents,checkfile, updateprogram];