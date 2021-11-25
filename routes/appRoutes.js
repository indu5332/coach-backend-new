const appRouter = require("express").Router();
const appController = require("../controllers");
const multer = require("multer");
const path = require("path");
const p = path.join(__dirname + "/../uploads/");

var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, p);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".");
    cb(null, Date.now() + "." + ext[ext.length - 1]);
  },
});
const upload = multer({ storage: storage });

appRouter.post(
  "/file/upload",
  upload.single("file"),
  appController.file.upload
);

appRouter.get("/", appController.app.home.home);

//contact page Api
appRouter.post("/contact/us", appController.app.contact.addContact);

//Authentication Api
appRouter.post("/signup", appController.app.authentication.signup);
appRouter.post("/login", appController.app.authentication.login);

//verify username Api
appRouter.post(
  "/verify/username",
  appController.app.authentication.verifyUsername
);

//Reset Password Api
appRouter.post(
  "/send/resetMail",
  appController.app.authentication.sendVerificationMail
);
appRouter.post(
  "/verify/resetToken",
  appController.app.authentication.verifyResetToken
);

const middleware = require("../middleware/verifyToken");
appRouter.use(middleware);

//user Api

appRouter.post(
  "/change/password",
  appController.app.authentication.change_paassword
);
appRouter.post("/update/user/:userId", appController.app.user.userUpdate);
appRouter.get("/user/detail/:userId", appController.app.user.userDetail);
appRouter.get("/user/delete", appController.app.user.userDelete);

module.exports = appRouter;