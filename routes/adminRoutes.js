const adminRouter = require("express").Router();
const adminController = require("../controllers");

adminRouter.get("/", adminController.admin.home.home);

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);
adminRouter.get("/contacts", adminController.admin.contact.contactList);

module.exports = adminRouter;
