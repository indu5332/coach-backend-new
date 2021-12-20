const programService = require("../../service/program.service");

const createProgram = async (req, res, next) => {
  try {
    var file = [];
    console.log(req.body)
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
      for (let i = 0; i < newProgram.file.length; i++) {
        const element = newProgram.file[i];
        element.url=programService.programImage(element.url)
      }
      return res.status(200).json({
        success: true,
        message: "program created",
        program: newProgram
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