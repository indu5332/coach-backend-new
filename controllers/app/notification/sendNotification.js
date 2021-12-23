const mongoose = require("mongoose");
const notificationService = require("../../service/notification.service");
const programService = require("../../service/program.service");
const userModel = require("../../../models/user.model");

const createNotification = async (req, res) => {
  console.log("Creating notification");
  try {
    if (req.body.sendTo === "all") {
      const conditions = [
        {
          $project: {
            _id: 1,
          },
        },
      ];
      const allUsers = await userModel.aggregate(conditions);
      console.log(allUsers)
      const filteredUsers = await Promise.all(allUsers.map(async (user) => user._id));
      await notificationService.sendNotification(req.body, filteredUsers, req.app.get("io"), allUsers);
      return res.status(200).json({
        success: true, message: "Notification sent successfully",
      });
    }
    if (req.body.userId) {
        const users = await userModel.find({_id:mongoose.Types.ObjectId(req.body.userId)});
        const filteredUsers = await Promise.all(users.map(async (user) => user._id));
        console.log(filteredUsers)
        //console.log(`sending notification to ${users[0].firstName + " " +users[0].lastName}`);
        await notificationService.sendNotification(req.body, filteredUsers, req.app.get("io"), users);
        return res.status(200).json({
          success: true, message: "Notification sent successfully",
        });
      }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, isError: true, error: error.message });
  }
};

module.exports = [
  createNotification,
];