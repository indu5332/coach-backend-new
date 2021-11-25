const userModel = require("../../../models/user.model");

const findUser = async (req, res, next) => {
  try {
    console.log("kjhg")
    if (req.params.userId) {
      const user = await userModel.findById(req.params.userId);
      if (user) {
        const link = `http://192.168.1.18:3001/api/v1/user/verify/${user.verificationToken}/${user._id}`;
        return res.status(200).json({
          success: true,
          message: "Hit this api to verify user",
          link,
        });
      }
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(404).json({
      success: false,
      message: "UserId not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      isError: true,
      error: error.message,
    });
  }
};

module.exports = [findUser];
