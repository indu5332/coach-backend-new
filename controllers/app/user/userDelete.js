const userModel = require("../../../models/user.model");
const mongoose = require("mongoose");

let deleteUser = async (req, res, next) => {
  try {
    let deleteRes = await userModel.deleteOne({
      _id: mongoose.Types.ObjectId(req.decoded._id),
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
    console.log(error);
    return res.status(500).json({
      success: false,
      isError: true,
      error: error,
    });
  }
};

module.exports = [deleteUser];
