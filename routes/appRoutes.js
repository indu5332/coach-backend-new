const appRouter = require("express").Router();
const appController = require("../controllers");
const path=require('path');
const multer=require('multer');
const storage = multer.diskStorage({
    destination: (req, res, cb) => { cb(null, path.join(`${__dirname}/../uploads/${req.params.folder}`)); },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  });
  const upload = multer({ storage:storage });
  
  appRouter.post("/file/upload/:folder", upload.single("file"), appController.file.upload);

appRouter.get("/", appController.app.home.home);

//contact page Api
appRouter.post("/contact-us", appController.app.contact.addContact);

//Authentication Api
appRouter.post("/signup", appController.app.authentication.signup);
appRouter.post("/login", appController.app.authentication.login);

//verify username Api
appRouter.post("/verify/username",appController.app.authentication.verifyUsername);

//Reset Password Api
appRouter.post("/forgot/password",appController.app.authentication.sendVerificationMail);
appRouter.get("/verify/email/:userId",appController.app.authentication.verifyResetToken);
appRouter.post("/reset/password",appController.app.authentication.resetPassword);

const middleware = require("../middleware/verifyToken");
appRouter.use(middleware);

//user Api
appRouter.post("/change/password",appController.app.authentication.change_paassword);
appRouter.put("/update/user/:userId", appController.app.user.userUpdate);
appRouter.get("/user/detail/:userId", appController.app.user.userDetail);

module.exports = appRouter;