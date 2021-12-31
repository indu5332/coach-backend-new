const userModel = require("../../../models/user.model");
const mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//delete user
let deleteUser = async (req, res) => {
  try {
    let deleteRes = await userModel.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.userId),
    });
    if (deleteRes.deletedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "user deleted",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "fail to delete user",
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [deleteUser];