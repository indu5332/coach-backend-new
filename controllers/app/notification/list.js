const notificationService = require("../../service/notification.service");

const listNotifications = async (req, res) => {
    try {
        const limit = req.params.limit ? Number(req.params.limit) : 10;
        const skip = (req.query.page ? Number(req.query.page) : 0) * limit;
        const notifications = await notificationService.listNotification(
          req.decoded._id, skip, limit,
        );
        //const totalNotification=await notificationService.totalNotifications()
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