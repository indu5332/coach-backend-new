const programService = require("../../service/program.service");
const programModel = require("../../../models/programm.model");
const mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const createProgram = async (req, res, next) => {
  try {
    var file = [];
    var durationDetail=[]
    const coverfile = {
      url: req.body.coverfile.url,
      isImage: programService.isImage(req.body.coverfile.url),
      isVideo: programService.isVideo(req.body.coverfile.url),
    };

    for (let i = 0; i < req.body.file.length; i++) {
      const element = req.body.file[i];
      const files = {
        url:element.url,
        isImage: programService.isImage(element.url),
        isVideo: programService.isVideo(element.url),
      };
      file.push(files);
    }
    
    for (let i = 0; i < req.body.durationDetail.length; i++) {
      const element = req.body.durationDetail[i];
      const durationCover = {
        title:element.title,
        description:element.description,
        day:element.day,
        //url:element.durationCoverImage.url,
        durationCoverImage:{
          url: element.durationCoverImage.url,
          isImage: programService.isImage(element.durationCoverImage.url),
          isVideo: programService.isVideo(element.durationCoverImage.url),
        }
      };
      durationDetail.push(durationCover)
      const durationEvent=[]
      for (let j = 0; j < req.body.durationDetail[i].durationEvent.length; j++) {
        const arr = req.body.durationDetail[i].durationEvent[j];
        const file=[]
        for (let k = 0; k < arr.file.length; k++) {
          const arr2 = arr.file[k];
          const file1={
            url:arr2.url,
            isImage:programService.isImage(arr2.url),
            isVideo:programService.isImage(arr2.url)
          }
          file.push(file1)
          console.log(file1)
        }
        durationEvent.push(file)
        //console.log(file)
      }
      durationDetail.push(durationEvent)
      //console.log(durationEvent)
    }
    //console.log(durationDetail)
    req.body.coverfile = coverfile;
    req.body.file = file;
    req.body.durationDetail=durationDetail
    const newProgram = await programService.createProgram({
      ...coverfile,
      ...file,
      ...durationDetail,
      ...req.body,
    });
    if (newProgram) {
      newProgram.coverfile.url = programService.programImage(req.body.coverfile.url)

      for (let i = 0; i < newProgram.file.length; i++) {
        const element = newProgram.file[i];
        element.url=programService.programImage(element.url)
      }

      for (let i = 0; i < newProgram.durationDetail.length; i++) {
        const element = newProgram.durationDetail[i];
        element.durationCoverImage.url=programService.programImage(element.durationCoverImage.url)
      }

      return res.status(200).json({
        success: true,
        message: "program created",
        program: newProgram,
      });
    }
    else{
      return res.status(500).json({
        success: false,
        message: "failed to create program",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};


module.exports = [createProgram];