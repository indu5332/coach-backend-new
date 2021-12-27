const adminRouter = require("express").Router();
const adminController = require("../controllers");

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);
//adminRouter.get("/list/public/program/duration", adminController.admin.programDuration.publicDurationList);

//contacts
adminRouter.get("/contacts", adminController.admin.contact.contactList);
adminRouter.put("/update/contact/:contactId", adminController.admin.contact.editContact);
adminRouter.delete("/delete/contact/:contactId", adminController.admin.contact.deleteContact);
adminRouter.get("/detail/contact/:contactId", adminController.admin.contact.detailContact);

adminRouter.delete("/user/delete/:userId", adminController.admin.user.userDelete);

//programm
adminRouter.post("/add/program", adminController.admin.programm.addProgramm);
adminRouter.get("/public/program/list", adminController.admin.programm.publicProgramList);
adminRouter.delete("/delete/program/:programId", adminController.admin.programm.deleteProgramm);
adminRouter.put("/update/program/:programId", adminController.admin.programm.editProgramm);
adminRouter.put("/program/push/file/:programId", adminController.admin.programm.pushFile);
adminRouter.put("/program/pull/file/:programId", adminController.admin.programm.pullFile);

//programDuration
adminRouter.post("/add/program/duration", adminController.admin.programDuration.add);
adminRouter.delete("/delete/program/duration/:programDurationId", adminController.admin.programDuration.delete);
adminRouter.put("/update/program/duration/:programDurationId", adminController.admin.programDuration.update)
adminRouter.put("/program/push/duration/file/:programDurationId", adminController.admin.programDurationLists.pushFile)
adminRouter.put("/program/pull/duration/file/:programDurationId", adminController.admin.programDurationLists.pullFile)

//detail programDuration for program
adminRouter.get("/detail/program/duration/:programDurationId", adminController.admin.programDuration.detail);

//list programs
adminRouter.get("/user/list/program", adminController.admin.programm.userProgramList);
adminRouter.get("/user/all-programs/:userId", adminController.admin.programm.userProgramDetail);

//list programDurations
adminRouter.get("/list/program/duration/:programId", adminController.admin.programDurationLists.listprogramDuration);
adminRouter.get("/list/user/program/duration/:userId", adminController.admin.programDuration.userDurationDetail);

//about-us
adminRouter.post("/about-us", adminController.admin.about.create);
adminRouter.put("/edit/about", adminController.admin.about.edit);

//gallery
adminRouter.post("/create/gallery", adminController.admin.gallery.create);
adminRouter.get("/detail/gallery/:galleryId", adminController.admin.gallery.detail);
adminRouter.delete("/delete/gallery/:galleryId", adminController.admin.gallery.delete);
adminRouter.put("/update/gallery/:galleryId", adminController.admin.gallery.update);

module.exports = adminRouter;