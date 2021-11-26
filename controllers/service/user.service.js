const bcrypt = require("bcryptjs");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("config");

const saltRounds = 10;

module.exports = {
  async findUser(data) {
    try {
      const user = await userModel.find(data);
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      createError(500, error);
    }
  },

  createUser: async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  updateUser: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await userModel.updateOne(conditions, dataToUpdate);
      return updateResult.modifiedCount > 0;
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  generateToken: async (payload) => {
    try {
      const token = await jwt.sign(payload, config.secret);
      return token;
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },
  userImage(url) {
    if (url === undefined || url === null) {
      return `${config.imagePath}/profile.png`;
    }
    if (url === "profile.png") {
      return `${config.imagePath}/profile.png`;
    }
    return `${config.imagePath}/users/${url}`;
  },
};
module.exports.hash = (password, callback) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      callback(error, hash);
    });
  });
};

module.exports.checkHashPassword = (password, hash, next) => {
  bcrypt.compare(password, hash, (err, res) => {
    next(err, res);
  });
};
//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     //killingspii
// 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    //nairagarg
