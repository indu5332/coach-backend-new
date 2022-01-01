const mongoose = require("mongoose");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const update = require("../../admin/programDuration/update");

//update user
let updateUser = async (req, res) => {
  try {
    if (req.params.userId === "me") {
      const finduser = await authService.findUser({
        _id: mongoose.Types.ObjectId(req.decoded._id),
      });
      if (!req.body.imagePath || req.body.imagePath === null) {
        delete req.body.imagePath;
        const updateRes = await authService.updateUser(
          { _id: mongoose.Types.ObjectId(req.decoded._id) },
          { $set: req.body }
        );
        updateRes.imagePath = authService.userImage(finduser[0].imagePath);
        return res.status(200).json({
          success: true,
          message: "user updated",
          user: updateRes,
        });
      } else {
        const updateRes = await authService.updateUser(
          { _id: mongoose.Types.ObjectId(req.decoded._id) },
          { $set: req.body }
        );
        updateRes.imagePath = authService.userImage(update.imagePath);
        return res.status(200).json({
          success: true,
          message: "user updated",
          user: updateRes,
        });
      }
    } else {
      if (req.decoded.isAdmin === true) {
        const finduser = await authService.findUser({
          _id: mongoose.Types.ObjectId(req.params.userId),
        });
        if (!req.body.imagePath || req.body.imagePath === null) {
          delete req.body.imagePath;
          const updateRes = await authService.updateUser(
            { _id: mongoose.Types.ObjectId(req.params.userId) },
            { $set: req.body }
          );
          console.log(finduser[0]);
          updateRes.imagePath = authService.userImage(finduser[0].imagePath);
          return res.status(200).json({
            success: true,
            message: "user updated",
            user: updateRes,
          });
        } else {
          const updateRes = await authService.updateUser(
            { _id: mongoose.Types.ObjectId(req.params.userId) },
            { $set: req.body }
          );
          updateRes.imagePath = authService.userImage(updateRes.imagePath);
          return res.status(200).json({
            success: true,
            message: "user updated",
            user: updateRes,
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "fail to authenticate admin",
        });
      }
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [updateUser];
