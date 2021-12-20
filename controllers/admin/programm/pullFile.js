const programmModel = require("../../../models/programm.model");
const programService = require("../../service/program.service");
const mongoose=require('mongoose')

const pushFile = async (req, res, next) => {
  try {
    let conditions = {
        _id: mongoose.Types.ObjectId(req.params.programId),
      };
      let dataToUpdate = {
        $pull: {
          file:{
            _id:mongoose.Types.ObjectId(req.body.fileId)   
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
        message: "file removed successfully",
        program: program
      });
    }
    else{
      return res.status(500).json({
        success: false,
        message: "failed to remove file",
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