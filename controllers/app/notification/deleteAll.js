const mongoose = require("mongoose");
const notificationModel = require("../../../models/notification.model");
const notificationService = require("../../service/notification.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//delete all notifications of specific user
let deleteAllNotification = async (req, res) => {
  try {
    const notifications = await notificationService.listAllNotification(
      req.decoded._id
    );
    for (let i = 0; i < notifications.length; i++) {
      const element = notifications[i];
      if (element.to._id == req.decoded._id) {
        await notificationModel.deleteOne({
          _id: mongoose.Types.ObjectId(element._id),
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: "notification deleted successfully",
    });
  } catch (error) {
    console.log(error);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [deleteAllNotification];