let mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../../models/user.model");
const authService = require("../../service/user.service");

//get user Detail
let UserDetail = async (req, res, next) => {
  try {
    if (req.params.userId === "me") {
      let user = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (user.length > 0) {
        user = JSON.parse(JSON.stringify(user[0]));
        user.imagePath = authService.userImage(user.imagePath);
        delete user.password;
        delete user.verificationToken;
        delete user.Duration;
        return res.status(200).json({
          success: true,
          message: "user details",
          user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "no user details found",
        });
      }
    } else {
      if (req.decoded.isAdmin === true) {
        let user = await authService.findUser({
          _id: mongoose.Types.ObjectId(req.params.userId),
        });
        if (user.length > 0) {
          user = JSON.parse(JSON.stringify(user[0]));
          user.imagePath = authService.userImage(user.imagePath);
          delete user.password;
          delete user.verificationToken;
          delete user.Duration;
          return res.status(200).json({
            success: true,
            message: "user details",
            user,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "no user details found",
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

module.exports = [UserDetail];