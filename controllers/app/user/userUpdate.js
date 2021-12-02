const mongoose = require("mongoose");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//user update
let updateUser = async (req, res, next) => {
  try {
    if (req.params.userId === "me") {
      console.log(req.body);
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
    if (req.params.userId === "me") {
      const user = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (!user || user.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No user exits" });
      }
      delete user[0].password;
      delete user[0].email;
      delete user[0].verificationToken;
      delete user[0].Duration;
      delete user[0].phone;
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: user[0],
      });
    } else {
      const user = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.params.userId),
      });
      if (!user || user.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No user exits" });
      }
      delete user[0].password;
      delete user[0].email;
      delete user[0].verificationToken;
      delete user[0].Duration;
      delete user[0].phone;
      return res.status(200).json({
        success: true,
        message: "user updated",
        user: user[0],
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [updateUser, findUser];
