const mongoose = require("mongoose");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//user update

let checkusername=async(req,res,next)=>{
  try {
    if(req.body.username){
      const find=await authService.findUser(req.body.username)
      if(find.length>0){
        next()
      }
      else{
        return res.status(404).json({
          success: false,
          message: "no username exists",
        });
      }
    }
    else{
      next()
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

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
        console.log(updateRes)
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
          return res.status(200).json({
            success: true,
            message: "user updated",
            user: updateRes,
          });
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
module.exports = [checkusername,updateUser];