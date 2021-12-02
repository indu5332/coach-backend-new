const aboutModel = require("../../../models/aboutUs.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let addAbout = async (req, res) => {
  try {
    const about = await aboutModel.create({ ...req.body });
    if (about) {
      return res.status(200).json({
        success: true,
        message: "about added successfully",
        about: about,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [addAbout];
