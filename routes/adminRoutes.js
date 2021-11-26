const adminRouter = require("express").Router();
const adminController = require("../controllers");

adminRouter.get("/", adminController.admin.home.home);

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);
adminRouter.get("/contacts", adminController.admin.contact.contactList);
adminRouter.get("/user/delete/:userId", adminController.admin.user.userDelete);
adminRouter.post("/add/program", adminController.admin.programm.addProgramm);
adminRouter.get("/all-programs", adminController.admin.programm.listProgramm);
adminRouter.get("/delete/program/:programId", adminController.admin.programm.deleteProgramm);
adminRouter.post("/update/program/:programId", adminController.admin.programm.editProgramm);

module.exports = adminRouter;
