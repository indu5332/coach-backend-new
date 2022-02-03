const programService = require("../../service/program.service");

//create a new program 
const createPublicProgram = async (req, res, next) => {
  try {
    var aboutProgramImage = [];
    var coverfile=[]
    var descriptionImage=[];
    for (let i = 0; i < req.body.aboutProgramImage.length; i++) {
      const element = req.body.aboutProgramImage[i];
      const files = {
        url:element.url,
        isImage: programService.isImage(element.url),
        isVideo: programService.isVideo(element.url),
      };
      aboutProgramImage.push(files);
    }

    for (let i = 0; i < req.body.coverfile.length; i++) {
      const element = req.body.coverfile[i];
      const files = {
        url:element.url,
        isImage: programService.isImage(element.url),
        isVideo: programService.isVideo(element.url),
      };
      coverfile.push(files);
    }

    for (let i = 0; i < req.body.descriptionImage.length; i++) {
      const element = req.body.descriptionImage[i];
      const files = {
        url:element.url,
        isImage: programService.isImage(element.url),
        isVideo: programService.isVideo(element.url),
      };
      descriptionImage.push(files);
    }

    req.body.aboutProgramImage = aboutProgramImage;
    req.body.coverfile = coverfile;
    req.body.descriptionImage = descriptionImage;
    console.log('coverfile',coverfile)

    const newProgram = await programService.createPublicProgram({
      ...req.body
    });
    if (newProgram) {
      for (let i = 0; i < newProgram.aboutProgramImage.length; i++) {
        const element = newProgram.aboutProgramImage[i];
        element.url=await programService.programImage(element.url)
      }

      for (let i = 0; i < newProgram.coverfile.length; i++) {
        const element = newProgram.coverfile[i];
        element.url=await programService.programImage(element.url)
      }

      for (let i = 0; i < newProgram.descriptionImage.length; i++) {
        const element = newProgram.descriptionImage[i];
        element.url=await programService.programImage(element.url)
      }

      return res.status(200).json({
        success: true,
        message: "program created successfully",
        program: newProgram,
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

module.exports = [createPublicProgram];