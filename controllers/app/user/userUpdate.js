const mongoose = require("mongoose");
const authService = require("../../service/user.service");
const notificationService=require('../../service/notification.service')
const notificationModel=require('../../../models/notification.model')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//check username
let checkusername=async(req,res,next)=>{
  try {
    if(req.body.username){
      const find=await authService.findUser({username:req.body.username})
      if(!find || find.length === 0){
        next()
      }
      else{
        if(req.body.username===find[0].username){
          next()
        }
        else{
          console.log(req.decoded)
          return res.status(400).json({
            success: false,
            message: "username already exists",
          });
        }
      }
    }
    else{
      next()
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

//update user
let updateUser = async (req, res, next) => {
  try {
    if (req.params.userId === "me") {
      const updateRes = await authService.updateUser(
        { _id: mongoose.Types.ObjectId(req.decoded._id) },
        { $set: req.body }
      );
      if (updateRes) {
        updateRes.imagePath = authService.userImage(updateRes.imagePath);
        delete updateRes.password
        delete updateRes.verificationToken;
        delete updateRes.Duration;
        return res.status(200).json({
          success: true,
          message: "user updated",
          user: updateRes,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "can't update",
        });
      }
    } else {
      if (req.decoded.isAdmin === true) {
        const updateRes = await authService.updateUser(
          { _id: mongoose.Types.ObjectId(req.params.userId) },
          { $set: req.body }
        );
        if (updateRes) {
          updateRes.imagePath = authService.userImage(updateRes.imagePath);
          delete updateRes.password;
          delete updateRes.verificationToken;
          delete updateRes.Duration;
          req.data={}
          req.data.updateRes=updateRes
          next()
        } else {
          return res.status(404).json({
            success: false,
            message: "fail to update user",
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

let updatenotification=async(req,res)=>{
  try {
    if(req.body.imagePath){
      const find=await notificationService.listAllNotification(req.decoded._id)
      console.log(find)
      const notification=await notificationModel.updateOne({"to._id":mongoose.Types.ObjectId(req.decoded._id)})
      console.log(notification)
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: req.data.updateRes,
      });
    }
    else{
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: req.data.updateRes,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

module.exports = [checkusername,updateUser,updatenotification];