const crypto = require("crypto");
const authService = require("../../service/user.service");
const { sendEmail } = require("../../service/mail.service");
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
    req.data.user = user[0];
    next();
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const sendEmailToUser = async (req, res) => {
  try {
    const verificationToken = crypto.randomBytes(100).toString("hex");
    const Duration = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const link = `http://localhost:4000/verify/email/${verificationToken}/${req.data.user._id}`;
    const data = {
      receiver: req.data.user.email,
      templateData: {
        url: link,
        subject: "reset password",
      },
    };
    await sendEmail(data);
    await authService.updateUser(
      { _id: req.data.user._id },
      {
        verificationToken,
        Duration,
      }
    );
    return res.status(200).json({ success: true, message: "mail sent!" });
  } catch (error) {
    console.log(error);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [findUser, sendEmailToUser];
