const jwt = require("jsonwebtoken");
const config = require("config");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//verify-Token
const authentication = async (req, res, next) => {
  try {
    const token = req.headers["x-api-key"];
    if (token) {
      jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
          return res.status(406).send({
            success: false,
            message: "Failed to authenticate token",
          });
        }
        req.decoded = decode;
        next();
      });
    } else {
      console.log("ljhjg");
      res.status(404).send({
        success: false,
        message: "No Token provided",
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = authentication;
