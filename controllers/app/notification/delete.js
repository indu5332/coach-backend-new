const mongoose = require("mongoose");
const notificationModel = require("../../../models/notification.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//delete a notification
let deleteNotification = async (req, res, next) => {
  try {
    const deleteNotification = await notificationModel.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.notificationId),
    });
    if (deleteNotification.deletedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "notification deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to delete notification", success: false });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [deleteNotification];