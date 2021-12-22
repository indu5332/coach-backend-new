const notificationService = require("../../service/notification.service");

const listNotifications = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (req.query.page ? Number(req.query.page) : 0) * limit;
    const allNotifications = await notificationService.listAllNotifications(
      req.decoded._id, skip, limit,
    );
    let totalUnseen = 0;
    await Promise.all(allNotifications.map(async (notification) => {
      if (!notification.seen) {
        totalUnseen += 1;
      }
      await notificationService.seenAllNotification(notification._id);
    }));
    const totalNotifications = await notificationService.totalNotifications(req.decoded._id);
    return res.status(200).json({
      success: true, totalUnseen, totalNotifications, allNotifications,
    });
  } catch (error) {
    return res.status(500).json({ success: false, isError: true, error: error.message });
  }
};

module.exports = [
  listNotifications,
];