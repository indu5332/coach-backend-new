const programService = require("../../service/program.service");
const notificationService=require('../../service/notification.service')
const mongoose=require('mongoose');
const userService=require('../../service/user.service')

const createProgram = async (req, res, next) => {
  try {
    var file = [];
    console.log("program",req.body)
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
      console.log("newProgram",newProgram)
      req.data={}
      req.data.newProgram=newProgram
      return res.status(200).json({
        success: true,
        message: "program created",
        program: newProgram
      });
    }
    else{
      next()
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
    console.log("creating notification")
      const user = await userService.findUser({_id:mongoose.Types.ObjectId(req.body.userId)});
      const data = {
        to: userToInform[0],
        title: "Ohh no,Someone report your story",
        payload: {
          user: user[0],
          userId: req.decoded._id,
          title: "Ohh no,Someone report your story",
          storyId: req.body.storyId,
        },
        seen: false,
      };
      // console.log(data);
      const io = req.app.get("io");
      await notificationService.createNotification(data, io, "program");
      return res.status(200).json({
        success: true,
        message: "program created successfully",
        program: req.data.newProgram,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, isError: true, error });
  }
};

module.exports = [createProgram,addNotification];