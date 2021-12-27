const mongoose = require("mongoose");
const notificationModel = require("../../../models/notification.model");
const notificationService = require("../../service/notification.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let deleteAllNotification = async (req, res, next) => {
  try {
    const notifications = await notificationService.listAllNotification(
      req.decoded._id
    );
    console.log(notifications)
    for (let i = 0; i < notifications.length; i++) {
      const element = notifications[i];
      console.log(element._id)
    }
  } catch (error) {
    console.log(error);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [deleteAllNotification];

//   if (element.to._id == req.decoded._id) {
    //     await notificationModel.deleteOne({
    //       _id: mongoose.Types.ObjectId(element._id),
    //     });
    //   }
//}
// return res.status(200).json({
//     success: true,
//     message: "notification deleted successfully",
// });