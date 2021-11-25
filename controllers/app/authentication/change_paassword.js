const mongoose = require("mongoose");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//find user by email
const findUser = async (req, res, next) => {
  try {
    const conditions = {
      _id: mongoose.Types.ObjectId(req.decoded._id),
    };
    const user = await authService.findUser(conditions);
    if (user.length > 0) {
      req.data = {};
      req.data.user = user[0];
      next();
    } else {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

//compare the passwords
const comparePassword = async (req, res, next) => {
  try {
    await authService.checkHashPassword(
      req.body.password,
      req.data.user.password,
      (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, isError: true, error: err.message });
        }
        if (isMatch) {
          next();
        } else {
          return res.status(401).json({
            success: false,
            isError: true,
            message: "You have entered wrong password",
          });
        }
      }
    );
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

//generate hash for new password
const generateHashPassword = async (req, res, next) => {
  try {
    await authService.hash(req.body.newPassword, (err, hashPassword) => {
      if (err) {
        return res.status(500).json({
          success: false,
          isError: true,
          error: err.messgae,
        });
      }
      req.data.hashPassword = hashPassword;
      next();
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

//update the hashed new password
const updatePassword = async (req, res) => {
  try {
    const conditions = {
      _id: mongoose.Types.ObjectId(req.decoded._id),
    };
    const dataToUpdate = {
      $set: {
        password: req.data.hashPassword,
      },
    };
    const updateRes = await authService.updateUser(conditions, dataToUpdate);
    if (updateRes) {
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Unable to update password" });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [
  findUser,
  comparePassword,
  generateHashPassword,
  updatePassword,
];
