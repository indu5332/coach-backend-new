let mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../../models/user.model");
const config = require("../../../config/production");
const userService=require('../../service/user.service');

//get user Detail
let getUserDetail = async (req, res, next) => {
  try {
    if (req.params.userId === "me") {
      let user = await userModel.find({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (user.length > 0) {
        user=JSON.parse(JSON.stringify(user[0]));
        user.imagePath= userService.userImage(user.imagePath)
        console.log(user)
        delete user.password
        return res.status(200).json({
          success: true,
          message: "Details of the given user as per the user Id.",
          user: user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "no user found",
        });
      }
    }
    else{
     if(req.decoded.isAdmin===true){
      let user = await userModel.find({
        _id: mongoose.Types.ObjectId(req.params.userId),
      });
      if (user.length > 0) {
        user=JSON.parse(JSON.stringify(user[0]));
        user.imagePath= userService.userImage(user.imagePath)
        console.log(user)
        delete user.password
        return res.status(200).json({
          success: true,
          message: "Details of the given user as per the user Id.",
          user: user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "no user found",
        });
      }
     }
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [getUserDetail];
