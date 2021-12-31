const programmModel = require("../../../models/programm.model");
const programService = require("../../service/program.service");
const mongoose=require('mongoose')

//add file to program
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
      };  
      const update=await programmModel.findByIdAndUpdate(conditions,dataToUpdate); 
      console.log(update)
      update.coverfile.url = programService.programImage(update.coverfile.url)
      for (let i = 0; i < update.file.length; i++) {
        const element = update.file[i];
        element.url=programService.programImage(element.url)
      }
      return res.status(200).json({
        success: true,
        message: "file removed successfully",
        program: update
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = [pushFile];