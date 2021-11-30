const mongoose = require("mongoose");
var createError = require("http-errors");
const config = require("config");
const httpStatus = require("http-status-codes").StatusCodes;
const authService = require("../../service/user.service");

//find user by email
const findUser = async (req, res, next) => {
  try {
    const data = req.body.username
      ? { username: req.body.username }
      : { email: req.body.email };
    const user = await authService.findUser(data);
    if (!user || user.length === 0) {
      return res.status(404).json({ success: false, message: "No user exits" });
    }
    req.data = {};
    req.data.user = JSON.parse(JSON.stringify(user[0]));
    next();
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

//compare password if correct
const comparePassword = async (req, res, next) => {
  try {
    await authService.checkHashPassword(
      req.body.password,
      req.data.user.password,
      (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, isError: true, error: err });
        }
        if (isMatch) {
          next();
        } else {
          return res.status(401).json({
            success: false,
            isError: true,
            message: "You have entered wrong email or password",
          });
        }
      }
    );
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

let addImage = async (req, res, next) => {
  req.data.user.imagePath = await userImage(req.data.user.imagePath);
  next();
};

async function userImage(imagePath) {
  if (imagePath === "profile.png") {
    return config.fileUrl + "/profile.png";
  } else {
    return;
  }
}

//generate token when user login
const generateToken = async (req, res) => {
  try {
    const payload = {
      _id: req.data.user._id,
      email: req.data.user.email,
      firstName: req.data.user.firstName,
      lastName: req.data.user.lastName,
      isAdmin: req.data.user.isAdmin,
    };
    const token = await authService.generateToken(payload);
    if (!token) {
      console.log(error);
      return res.sstatus(400).json({
        success: false,
        error: error,
      });
    } else {
      delete req.data.user.password;
      console.log(req.data.user)
      return res.status(200).json({
        success: true,
        message: "loged in successfully",
        "x-access-token": token,
        user: req.data.user,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [findUser, comparePassword, addImage, generateToken];
