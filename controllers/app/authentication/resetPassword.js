const mongoose = require("mongoose");
let userModel = require("../../../models/user.model");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const findUserByToken = async (req, res, next) => {
  try {
    const user = await userModel.find({_id:mongoose.Types.ObjectId(req.body.userId)});
    if (user.length > 0) {
      req.data = {};
      req.data.user = user[0];
      next();
    } else {
      return res.status(404).json({ status: false, message: "no user found" });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const generateHashPassword = async (req, res, next) => {
  try {
    await authService.hash(req.body.password, (err, hashPassword) => {
      if (err) {
        return res.status(500).json({
          success: false,
          isError: true,
          error: err.message,
        });
      }
      req.data = {};
      req.data.hashPassword = hashPassword;
      next();
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateResult = await userModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.userId) },
      {
        $set: {
          verificationToken: null,
          Duration: null,
          password: req.data.hashPassword,
        },
      }
    );
    console.log(req.body)
    console.log(updateResult)
    if (updateResult) {
      return res.status(200).json({
        success: true,
        message: "Email verified",
        user: req.data.user,
      });
    }
    if (!updateResult) {
      return res.status(500).json({
        success: true,
        message: "Fail to verify email.Please try again !",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, isError: true, error: error.message });
  }
};

module.exports = [findUserByToken, generateHashPassword, updateUser];
