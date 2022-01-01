/* eslint-disable no-underscore-dangle */
const notificationService = require("../../service/notification.service");

//unseen notifications
const countNotification = async (req, res) => {
  try {
    const unseenNotifications = await notificationService.UnseenNotification(req.decoded._id);
    return res.status(200).json({
      success: true,
      message: "Unseen message",
      unseenNotification: unseenNotifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      isError: true,
      error,
    });
  }
};

module.exports = [
  countNotification,
];