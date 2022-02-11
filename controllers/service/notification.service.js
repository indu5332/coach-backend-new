const mongoose = require("mongoose");
const notificationModel = require("../../models/notification.model");
const userService=require("../service/user.service")

async function sendNotification(notificationData, io,event) {
    try {
      const newNotification = await notificationModel.create(notificationData);
      if (newNotification) {
        if (io) {
            newNotification.to.imagePath=userService.userImage(newNotification.to.imagePath)
            // console.log(newNotification)
          io.to(notificationData.to.id).emit(event, { newNotification });
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

  async function listAllNotification(userId) {
    const conditions = [
      {
        $match: {
          $or: [
            { "to._id": userId },
            { "to._id": mongoose.Types.ObjectId(userId) },
          ],
        },
      }
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
  async function UnseenNotification(userId) {
    try {
      const unseen = await notificationModel.countDocuments({ "to._id": userId, seen: false });
      return unseen;
    } catch (error) {
      return error;
    }
  }


module.exports = {
  sendNotification,
  listNotification,
  listAllNotification,
  updateNotification,
  updateNotification,
  UnseenNotification
};