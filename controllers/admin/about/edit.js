const aboutModel = require("../../../models/aboutUs.model");
const mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let editAbout = async (req, res) => {
  try {
    const about = await aboutModel.updateOne({$set:req.body});
    if (about.modifiedCount>0) {
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
module.exports = [editAbout];
