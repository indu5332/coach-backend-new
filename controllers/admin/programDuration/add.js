const programDurationService = require("../../service/programDuration.service");

const createProgram = async (req, res, next) => {
  try {
    const durationCoverImage = {
      url: req.body.durationCoverImage.url,
      isImage: programDurationService.isImage(req.body.durationCoverImage.url),
      isVideo: programDurationService.isVideo(req.body.durationCoverImage.url),
    };
    var durationEvent=[]
    for (let i = 0; i < req.body.durationEvent.length; i++) {
      const element = req.body.durationEvent[i];
      durationTitle={
        durationTitle:element.durationTitle
      }
      durationEvent.push(durationTitle)
      var file=[]
      for (let j = 0; j < element.file.length; j++) {
        const arr = element.file[j];
        const file1={
          url:arr.url,
          isImage:programDurationService.isImage(arr.isImage),
          isVideo:programDurationService.isVideo(arr.isVideo)
        }
        file.push(file1)
      }
      durationEvent.push(file)
    }
    console.log(durationEvent)
    req.body.durationCoverImage = durationCoverImage;
    req.body.durationEvent=durationEvent
    const newProgram = await programDurationService.createprogramDuration({
      ...req.body
    });
    if (newProgram) {
      //console.log(newProgram)
      newProgram.durationCoverImage.url = programDurationService.programDurationImage(req.body.durationCoverImage.url)
      return res.status(200).json({
        success: true,
        message: "program created",
        newProgram
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