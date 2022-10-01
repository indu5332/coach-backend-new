const adminRouter = require("express").Router();
const adminController = require("../controllers");

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);

//contacts
adminRouter.get("/contacts", adminController.admin.contact.contactList);
adminRouter.put("/update/contact/:contactId", adminController.admin.contact.editContact);
adminRouter.delete("/delete/contact/:contactId", adminController.admin.contact.deleteContact);
adminRouter.get("/detail/contact/:contactId", adminController.admin.contact.detailContact);

adminRouter.delete("/user/delete/:userId", adminController.admin.user.userDelete);

//user programm
adminRouter.post("/add/program", adminController.admin.UserProgramm.addUserProgram);
adminRouter.get("/user/all-programs/:userId", adminController.admin.UserProgramm.userProgramList);
adminRouter.delete("/delete/program/:programId", adminController.admin.UserProgramm.deleteUserProgramm);
adminRouter.put("/update/program/:programId", adminController.admin.UserProgramm.editUserProgramm);
adminRouter.get("/detail/program/:programId", adminController.admin.UserProgramm.detailUserProgramm);

//public program
adminRouter.post("/add/public/program", adminController.admin.publicProgram.addPublicProgramm);
adminRouter.get("/public/program/list", adminController.admin.publicProgram.publicProgramList);
adminRouter.delete("/delete/public/program/:publicProgramId", adminController.admin.publicProgram.deletePublicProgram);
adminRouter.put("/edit/public/program/:publicProgramId", adminController.admin.publicProgram.editPublicProgram);

//programDuration
adminRouter.post("/add/program/duration", adminController.admin.programDuration.add);
adminRouter.delete("/delete/program/duration/:programDurationId", adminController.admin.programDuration.delete);
adminRouter.put("/update/program/duration/:programDurationId", adminController.admin.programDuration.update)

//about-us
adminRouter.post("/about-us", adminController.admin.about.create);
adminRouter.put("/edit/about", adminController.admin.about.edit);

//gallery
adminRouter.post("/create/gallery", adminController.admin.gallery.create);
adminRouter.get("/detail/gallery/:galleryId", adminController.admin.gallery.detail);
adminRouter.delete("/delete/gallery/:galleryId", adminController.admin.gallery.delete);
adminRouter.put("/update/gallery/:galleryId", adminController.admin.gallery.update);

//user Events
adminRouter.get("/events/Detail/:uuid", adminController.admin.user.getInviteeDetail);

module.exports = adminRouter;