const mongoose = require("mongoose");
const notificationService = require("../../service/notification.service");
const authService = require("../../service/user.service");
const programService = require("../../service/program.service");

const createNotification = async (req, res) => {
  console.log("Creating notification");
  try {
    if (req.body.sendTo === "all") {
      const conditions = [
        {
          $project: {
            id: 1,
            _id: 1,
          },
        },
      ];
      const allUsers = await authService.findUser(conditions);
      const filteredUsers = await Promise.all(allUsers.map(async (user) => user._id));
      await notificationService.sendNotification(req.body, filteredUsers, req.app.get("io"), allUsers);
      return res.status(200).json({
        success: true, message: "Notification sent successfully",
      });
    }
    if (Array.isArray(req.body.sendTo)) {
      const programIds = [];
      await Promise.all(req.body.sendTo.map(
        async (program) => programIds.push(mongoose.Types.ObjectId(program)),
      ));
      const users = await programService.findPlansOfUsers(programIds);
      const filteredUsers = await Promise.all(users.map(async (user) => user.userId));
      if (req.body.usersList.length > 0) {
        req.body.usersList.forEach((user) => {
          filteredUsers.push(mongoose.Types.ObjectId(user._id));
          users.push(user);
        });
      }
      console.log("sending notification to");
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