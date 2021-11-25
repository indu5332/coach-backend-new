const crypto = require("crypto");
let userModel = require("../../../models/user.model");
const authService = require("../../service/user.service");
const mailService = require("../../service/mail.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const findUser = async (req, res, next) => {
  try {
    const data = { email: req.body.email };
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

const sendEmail = async (req, res) => {
  try {
    const verificationToken = crypto.randomBytes(100).toString("hex");
    console.log(verificationToken)
    const Duration = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const link = `http://localhost:4000/verify/email/${verificationToken}/${req.data.user._id}`;
    const data = {
      receiver: req.data.user.email,
      templateData: {
        url: link,
        subject: "reset password",
      },
    };
    await mailService.sendEmail(data);
    await userModel.updateOne(
      { _id: req.data.user._id },
      {
        verificationToken,
        Duration,
      }
    );
    return res.status(200).json({ success: true, message: "mail sent!" });
  } catch (error) {
    console.log(error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [findUser, sendEmail];
