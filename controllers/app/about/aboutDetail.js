const aboutModel = require("../../../models/aboutUs.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//about detail
let aboutDetail = async (req, res, next) => {
  try {
    const about = await aboutModel.find({});
    if (about.length > 0) {
      return res.status(200).json({
        status: true,
        message: "about list",
        about: about[0],
      });
    }
    else{
        return res.status(404).json({
            status:false,
            message:"no about details found"
        })
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [aboutDetail];