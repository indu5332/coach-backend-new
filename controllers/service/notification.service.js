const mongoose = require("mongoose");
const notificationModel = require("../../models/notification.model");
const userService = require("./user.service");

async function sendNotification(notificationData, io, event) {
    try {
      const newNotification = await notificationModel.create(notificationData);
      if (newNotification) {
        if (io) {
          const user = await userService.findUser(newNotification.userId);
          const data = {
            ...notificationData,
            ...user._id,
            createdAt: new Date(),
          };
          io.to(notificationData.to.id).emit(event, { ...data });
          console.log(data);
        }
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

async function listAllNotifications(userId, skip, limit) {
  try {
    const conditions = [
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];
    const allNotifications = await notificationModel.aggregate(conditions);
    return allNotifications;
  } catch (error) {
    throw new Error(error.message);
  }
}

// async function notificationForNewStockInTable(portfolios) {
//   try {
//     const conditions = [
//       {
//         $match: {
//           "portfolios.portfolioId": { $in: portfolios },
//         },
//       },
//     ];
//     const plans = await planService.findPlan(conditions);
//     const planIds = [];
//     await Promise.all(plans.map(async (plan) => {
//       planIds.push(mongoose.Types.ObjectId(plan._id));
//     }));
//     return planIds;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

async function unseenNotification(userId) {
  try {
    const conditions = {
      user: mongoose.Types.ObjectId(userId),
      seen: false,
    };
    const notification = await notificationModel.countDocuments(conditions);
    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function seenAllNotification(notificationId) {
  try {
    const conditions = {
      _id: mongoose.Types.ObjectId(notificationId),
    };
    const notification = await notificationModel.updateOne(conditions, { $set: { seen: true } });
    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function totalNotifications(userId) {
  try {
    return notificationModel.countDocuments({ user: mongoose.Types.ObjectId(userId) });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  sendNotification,
  listAllNotifications,
  sendNotification,
  //notificationForNewStockInTable,
  unseenNotification,
  seenAllNotification,
  totalNotifications,
};