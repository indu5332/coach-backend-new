/* eslint-disable consistent-return */
const Path = require("path");
const imageMiddleware = require("../../middleware/image.middleware");

const p = Path.join(`${__dirname}/../../uploads/`);


  const uploadFileForPublicStory = async (req, res, next) => {
    try {
        if (req.file) {
            if (req.file !== "") {
              const data = await imageMiddleware.uploadS3(req.file.originalname, req.query.folder );
              console.log(data)
              return res.status(200).json({
                success: true,
                message: "file uploaded successfully.",
                file:req.file.originalname
              });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "fail to upload file",
              });
        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, isError: true, error: error.message });
    }
  };
  
  module.exports = [
    uploadFileForPublicStory
  ];