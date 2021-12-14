const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let addProgram = async (req, res) => {
  try {
    const program = await programService.createProgram({ ...req.body });
    if (program) {
      return res.status(200).json({
        success: true,
        message: "programm added successfully",
        program: program[0],
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const addNotification = async (req, res, next) => {
  try {
    const userProgram = await user.findUserById(req.body.userId).then((user) => user);
    const isfriend = await isFriend.isFriend(req.decoded._id, req.data.user);
    if (!isfriend) {
      req.data.commentUser = userProgram[0];
      next();
    } else {
      const userToInform = await user.findUserById(req.data.user).then((user) => user);
      req.data.commentUser = userProgram[0];
      const data = {
        to: userToInform[0],
        title: "One new comment",
        body: `${userProgram[0].firstname} ${userProgram[0].lastname} comment on your story`,
        linkTo: "story",
        type: "story",
        payload: {
          user: userProgram[0],
          userId: req.decoded._id,
          title: "One new comment",
          body: `${userProgram[0].firstname} ${userProgram[0].lastname}, comment on your story`,
          message: `${req.body.message}`,
          type: "story",
          storyId: req.body.storyId,
          linkTo: "story",
        },
        seen: false,
      };
      const io = req.app.get("io");
      await notificationModel.createNotification(data, io, "story");
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, isError: true, error });
  }
};

module.exports = [addProgram];