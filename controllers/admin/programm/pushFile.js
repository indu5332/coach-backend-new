const programmModel = require("../../../models/programm.model");
const programService = require("../../service/program.service");
const mongoose=require('mongoose')

//remove file from program
const pushFile = async (req, res, next) => {
  try {
    var file = [];
    for (let i = 0; i < req.body.file.length; i++) {
      const element = req.body.file[i];
      const files = {
        url:element.url,
        isImage: programService.isImage(element.url),
        isVideo: programService.isVideo(element.url),
      };
      file.push(files);
    }
    req.body.file = file;
    let conditions = {
        _id: mongoose.Types.ObjectId(req.params.programId),
      };
      let dataToUpdate = {
        $push: {
          file:{
            $each:file   
          }
        },
      };  await programmModel.findByIdAndUpdate(conditions,dataToUpdate); 
      const program=await programService.findprogram({_id:mongoose.Types.ObjectId(req.params.programId)})
    if (program.length>0) {
        program[0].coverfile.url = programService.programImage(program[0].coverfile.url)
      for (let i = 0; i < program[0].file.length; i++) {
        const element = program[0].file[i];
        element.url=programService.programImage(element.url)
      }
      return res.status(200).json({
        success: true,
        message: "file added successfully",
        program: program
      });
    }
    else{
      return res.status(500).json({
        success: false,
        message: "failed to add file",
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

module.exports = [pushFile];