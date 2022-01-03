const appRouter = require("express").Router();
const appController = require("../controllers");

const multer = require("multer");
const Path = require("path");

const p = Path.join(`${__dirname}../../uploads/`);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, p + req.query.folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

appRouter.get("/", appController.app.home.home);

//public program
appRouter.get("/all-programs", appController.admin.programm.openPublicProgram);
appRouter.get("/admin/detail/program/:programId", appController.admin.programm.detailProgramm);

//public program duration
appRouter.get("/admin/program/duration/:programId/:day", appController.admin.programDurationLists.dayDetail);
appRouter.get("/admin/list/program/duration/:programId", appController.admin.programDurationLists.listprogramDuration);
appRouter.get("/admin/detail/program/duration/:programDurationId", appController.admin.programDuration.detail);

appRouter.get("/about", appController.app.about.aboutDetail);

appRouter.get("/list/gallery", appController.admin.gallery.list);

appRouter.post("/upload", multer({ storage:storage }).single("file"),appController.file.upload );

//contact page Api
appRouter.post("/contact-us", appController.app.contact.addContact);

//Authentication Api
appRouter.post("/signup", appController.app.authentication.signup);
appRouter.post("/login", appController.app.authentication.login);

//verify username Api
appRouter.post("/verify/username",appController.app.authentication.verifyUsername);

//Reset Password Api
appRouter.post("/forgot/password",appController.app.authentication.sendVerificationMail);
appRouter.post("/verify/email",appController.app.authentication.verifyResetToken);
appRouter.post("/reset/password",appController.app.authentication.resetPassword);

const middleware = require("../middleware/verifyToken");
appRouter.use(middleware);

//user Api
appRouter.post("/change/password",appController.app.authentication.change_paassword);
appRouter.put("/update/user/:userId", appController.app.user.userUpdate);
appRouter.get("/user/detail/:userId", appController.app.user.userDetail);

//user program
appRouter.get("/user/program/detail/:programId", appController.app.userProgram.detail);
appRouter.get("/user/program/list", appController.app.userProgram.list);

//notification
appRouter.get("/my/notification", appController.app.notification.list);
appRouter.get("/notification-unseen", appController.app.notification.unseenNotification);
appRouter.delete("/delete/notification/:notificationId", appController.app.notification.delete);
appRouter.delete("/delete/notification", appController.app.notification.deleteAll);

//userDuration
appRouter.get("/user/duration/detail/:programDurationId", appController.app.programDuration.programDurationDetail);
appRouter.get("/list/user/program/duration/:programId", appController.app.programDuration.userDurationList);

module.exports = appRouter;