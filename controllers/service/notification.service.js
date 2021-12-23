const mongoose = require("mongoose");
const notificationModel = require("../../models/notification.model");
const userService = require("./user.service");

async function sendNotification(notificationData, io, event) {
    try {
      const newNotification = await notificationModel.create(notificationData);
      if (newNotification) {
        if (io) {
          const user = await userService.findUser(newNotification.userId);
          console.log("data");
          const data = {
            ...notificationData,
            ...user._id,
            createdAt: new Date(),
          };
          //console.log(data);
          io.to(notificationData.to.id).emit(event, { ...data });
          
        }
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function listNotification(userId, skip, limit) {
    const conditions = [
      {
        $match: {
          $or: [
            { "to._id": userId },
            { "to._id": mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,

        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];
    const data = await notificationModel.aggregate(conditions);
    return data;
  }

async function updateNotification(notificationId) {
    const conditions = {
      _id: mongoose.Types.ObjectId(notificationId),
    };
    const updateNotificationResponse = await notificationModel.updateOne(conditions,
      { $set: { seen: true } });
    if (updateNotificationResponse.nModified > 0) {
      return true;
    }
    return false;
}

module.exports = {
  sendNotification,
  listNotification,
  sendNotification,
  updateNotification,
};