const mongoose = require("mongoose");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//user update
let updateUser = async (req, res, next) => {
  try {
    if (req.params.userId === "me") {
      const updateRes = await authService.updateUser(
        { _id: mongoose.Types.ObjectId(req.decoded._id) },
        { $set: req.body }
      );
      if (updateRes) {
        next();
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
          next();
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

const findUser = async (req, res) => {
  try {
    if(req.params.userId==='me'){
      const user = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (!user || user.length === 0) {
        return res.status(404).json({ success: false, message: "No user exits" });
      }
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: user,
      });
    }
    else{
      const user = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.params.userId),
      });
      if (!user || user.length === 0) {
        return res.status(404).json({ success: false, message: "No user exits" });
      }
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: user,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [updateUser, findUser];
