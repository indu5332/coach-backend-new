const notificationService = require("../../service/notification.service");

const unseenNotification = async (req, res) => {
  try {
    const notification = await notificationService.unseenNotification(req.decoded._id);
    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = [
  unseenNotification,
];