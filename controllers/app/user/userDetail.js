let mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../../models/user.model");
const config = require("config");
const { imagePath } = require("../../../config/production");

//get user Detail
let getUserDetail = async (req, res, next) => {
  try {
    //console.log("jgh")
    if (req.params.userId === "me") {
      const user = await userModel.find({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (user.length > 0) {
        req.data = {};
        req.data.user = JSON.parse(JSON.stringify(user[0]));
        next();
      } else {
        return res.status(404).json({
          success: false,
          message: "no details found",
        });
      }
    } else {
      if (req.decoded.isAdmin === true) {
        const user = await userModel.find({
          _id: mongoose.Types.ObjectId(req.params.userId),
        });
        if (user.length > 0) {
          return res.status(200).json({
            success: true,
            user: user[0],
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "no user found",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "fail to authenticate admin",
        });
      }
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
let addImage = async (req, res) => {
  req.data.user.imagePath = await userImage(req.data.user.imagePath);
  return res.status(200).json({
    success: true,
    message: "Details of the given user as per the user Id.",
    user: req.data.user,
  });
};

async function userImage(imagePath) {
  if (imagePath === "profile.png") {
    return config.fileUrl + "/profile.png";
  } else {
    return;
  }
}

module.exports = [getUserDetail, addImage];
