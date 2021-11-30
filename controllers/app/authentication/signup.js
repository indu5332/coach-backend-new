var createError = require("http-errors");
const config=require('config')
const authService = require("../../service/user.service");
const httpStatus = require("http-status-codes").StatusCodes;

// find user by email
const findUserEmail = async (req, res, next) => {
  try {
    const data = { email: req.body.email };
    const user = await authService.findUser(data);
    if (user.length === 0) {
      next();
    } else {
      return res.status(404).json({
        success: false,
        isError: true,
        message: "email is already registered",
      });
    }
  } catch (err) {
    console.log(err);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const findUserName = async (req, res, next) => {
  try {
    const data = { username: req.body.username };
    const user = await authService.findUser(data);
    if (user.length === 0) {
      next();
    } else {
      return res
        .status(406)
        .json({ success: false, message: "This username is already in taken" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, isError: true, error: error.message });
  }
};
//generate hash password
const generateHashPassword = async (req, res, next) => {
  try {
    await authService.hash(req.body.password, (err, hashPassword) => {
      if (err) {
        //console.log(err)
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

//create a new user
const CreateUser = async (req, res, next) => {
  try {
    let user = req.body;
    const data = {
      ...user,
      password: req.data.hashPassword,
    };
    const newUser = await authService.createUser(data);
    console.log(newUser);
    if (newUser) {
      req.data.newUser = newUser;
      next();
    } else {
      return res.status(500).json({
        success: false,
        isError: true,
        error: err.message,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};


const generateToken = async (req, res) => {
  try {
    const payload = {
      _id: req.data.newUser._id,
      email: req.data.newUser.email,
      firstName: req.data.newUser.firstName,
      lastName: req.data.newUser.lastName,
      isAdmin: req.data.newUser.isAdmin,
    };
    const token = await authService.generateToken(payload);
    if (!token) {
      //console.log(error);
      return res.status(400).json({
        success: false,
        error: error,
      });
    } else {
      delete req.data.hashPassword;
      let createdUser=JSON.parse(JSON.stringify(req.data.newUser));
      console.log(authService.userImage(createdUser.imagePath))
      createdUser.imagePath=authService.userImage(createdUser.imagePath)
      return res.status(200).json({
        success: true,
        message: "loged in successfully",
        "x-access-token": token,
        user: createdUser,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [
  findUserEmail,
  findUserName,
  generateHashPassword,
  CreateUser,
  generateToken,
];
