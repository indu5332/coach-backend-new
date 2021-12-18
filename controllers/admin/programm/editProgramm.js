const mongoose = require("mongoose");
const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const checkCoverFile = async (req, res, next) => {
  try {
    if (req.body.file) {
      const file = [];
      for (let i = 0; i < req.body.file.length; i++) {
        const element = req.body.file[i];
        const files = {
          url: element.url,
          isImage: programService.isImage(element.url),
          isVideo: programService.isVideo(element.url),
        };
        file.push(files);
      }
      req.body.file = file;
      console.log()
      const update=await programService.updateFiles(
        {_id:mongoose.Types.ObjectId(req.params.programId)},
        {"file._id":mongoose.Types.ObjectId(req.body.fileId)},
        {
          $set:{
          file:file
        }
      }
        );
        console.log(update)
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
    console.log(req.data.coverfile)
    const update = await programService.updateProgram(
      {_id:mongoose.Types.ObjectId(req.params.programId)},
      {
        $set:req.body
      }
    );
    console.log(update)
    if (update) {
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