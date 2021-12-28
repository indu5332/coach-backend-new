const programService = require("../../service/program.service");
const notificationModel=require('../../service/notification.service')
const mongoose=require('mongoose');
const userService=require('../../service/user.service')

const createProgram = async (req, res, next) => {
  try {
    var file = [];
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
    req.body.coverfile = coverfile;
    req.body.file = file;
    const newProgram = await programService.createProgram({
      ...req.body
    });
    if (newProgram) {
      newProgram.coverfile.url = programService.programImage(req.body.coverfile.url)
      newProgram.pdfUrl=programService.programImage(newProgram.pdfUrl)
      for (let i = 0; i < newProgram.file.length; i++) {
        const element = newProgram.file[i];
        element.url=programService.programImage(element.url)
      }
      req.data={}
      req.data.newProgram=newProgram
      next()
    }
    else{
      return res.status(400).json({
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

const addNotification = async (req, res, next) => {
  try {
    if(req.body.userId){
      console.log("creating notification")
      const user = await userService.findUser({_id:mongoose.Types.ObjectId(req.body.userId)});
      const data = {
        to: user[0],
        title: "your program has been created",
        body:`hey! ${user[0].firstName} new program created for you by coach champion`,
        title:`hey! ${user[0].firstName} new program created for you by coach champion`,
        seen: false,
      };
      const io = req.app.get("io");
      await notificationModel.sendNotification(data, io, "program");
      return res.status(200).json({
        success: true,
        message: "program created successfully",
        program: req.data.newProgram,
      });
    }
    else{
      return res.status(200).json({
        success: true,
        message: "program created",
        program: req.data.newProgram,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, isError: true, error });
  }
};

module.exports = [createProgram,addNotification];