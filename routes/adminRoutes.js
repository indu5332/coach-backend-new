const adminRouter = require("express").Router();
const adminController = require("../controllers");

adminRouter.get("/", adminController.admin.home.home);

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);
adminRouter.get("/contacts", adminController.admin.contact.contactList);
adminRouter.delete("/user/delete/:userId", adminController.admin.user.userDelete);
adminRouter.post("/add/program", adminController.admin.programm.addProgramm);
adminRouter.get("/all-programs", adminController.admin.programm.listProgramm);
adminRouter.delete("/delete/program/:programId", adminController.admin.programm.deleteProgramm);
adminRouter.put("/update/program/:programId", adminController.admin.programm.editProgramm);
adminRouter.get("/detail/program/:programId", adminController.admin.programm.detailProgramm);

module.exports = adminRouter;