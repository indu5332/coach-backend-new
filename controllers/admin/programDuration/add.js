const programDurationService = require("../../service/programDuration.service");

const createProgram = async (req, res, next) => {
  try {
    const durationCoverImage = {
      url: req.body.durationCoverImage.url,
      isImage: programDurationService.isImage(req.body.durationCoverImage.url),
      isVideo: programDurationService.isVideo(req.body.durationCoverImage.url),
    };
    req.body.durationCoverImage = durationCoverImage;
    let newProgram=req.body;
    const formatedProgram=[]
    for (let index = 0; index < newProgram.durationEvent.length; index++) {
      const element = newProgram.durationEvent[index];
      if(element.file.length>0){
        for (let j = 0; j < element.file.length; j++) {
          const felement = element.file[j];
          const file= {
            url:felement.url,
            isImage:programDurationService.isImage(felement.url),
            isVideo:programDurationService.isVideo(felement.url),
          }
          element.file[j]=file;
        }
      }
      formatedProgram.push(element);
    }
    req.body.durationEvent=formatedProgram
    let program=await programDurationService.createprogramDuration(req.body)
    if(program){
      program.durationCoverImage.url=programDurationService.programDurationImage(program.durationCoverImage.url)
      await Promise.all(program.durationEvent.map(async programs=>{
        for (let i = 0; i < programs.file.length; i++) {
          const element = programs.file[i];
          element.url= programDurationService.programDurationImage(element.url)
        }
       }))
      return res.status(200).json({
        success: true,
        message: "program created",
        program,
      });
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

module.exports = [createProgram];