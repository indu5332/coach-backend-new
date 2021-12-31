const  mongoose  = require("mongoose");
const programDurationModel = require("../../../models/programDuration.model");
const programDurationService = require("../../service/programDuration.service");


//add new file to program duration 
const createProgram = async (req, res, next) => {
  try {
    var file = [];

    for (let i = 0; i < req.body.file.length; i++) {
      const element = req.body.file[i];
      const files = {
        url:element.url,
        isImage: programDurationService.isImage(element.url),
        isVideo: programDurationService.isVideo(element.url),
      };
      file.push(files);
    }
    req.body.file = file;
      const update=await programDurationModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.programDurationId),
        "durationEvent._id":mongoose.Types.ObjectId(req.body.durationEventId)},
        {
            $push:{
            "durationEvent.$.file":req.body.file,
          }
        }
        ); 
        console.log(update)
       update.durationCoverImage.url = programDurationService.programDurationImage(update.durationCoverImage.url)
        await Promise.all(update.durationEvent.map(async programs=>{
          for (let i = 0; i < programs.file.length; i++) {
            const element = programs.file[i];
            element.url= programDurationService.programDurationImage(element.url)
          }
       }))
       return res.status(200).json({
        success: true,
        message: "file added successfully",
        program:update
      });
    } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = [createProgram];