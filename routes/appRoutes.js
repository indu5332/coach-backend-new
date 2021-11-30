const appRouter = require("express").Router();
const appController = require("../controllers");


appRouter.get("/", appController.app.home.home);

appRouter.post("/upload", appController.file.file ,appController.file.upload );

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