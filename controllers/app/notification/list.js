const notificationService = require("../../service/notification.service");
const userService=require('../../service/user.service')

const listNotifications = async (req, res) => {
    try {
        const limit = req.params.limit ? Number(req.params.limit) : 10;
        const skip = (req.query.page ? Number(req.query.page) : 0) * limit;
        const notifications = await notificationService.listNotification(
          req.decoded._id, skip, limit,
        );
        await Promise.all(notifications.map(async element => {
            element.to.imagePath=userService.userImage(element.to.imagePath)
        }));
        return res.status(200).send({
          success: true,
          isError: false,
          totalNotifications:notifications.length,
          notifications,
        });
  } catch (error) {
    return res.status(500).json({ success: false, isError: true, error: error.message });
  }
}

module.exports = [
  listNotifications,
];