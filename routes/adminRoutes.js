const adminRouter = require("express").Router();
const adminController = require("../controllers");

adminRouter.get("/", adminController.admin.home.home);

const AdminMiddleware = require("../middleware/verifyAdminToken");
adminRouter.use(AdminMiddleware);

adminRouter.get("/all-users", adminController.admin.user.usersList);

//contacts
adminRouter.get("/contacts", adminController.admin.contact.contactList);
adminRouter.put("/update/contact/:contactId", adminController.admin.contact.editContact);
adminRouter.delete("/delete/contact/:contactId", adminController.admin.contact.deleteContact);
adminRouter.get("/detail/contact/:contactId", adminController.admin.contact.detailContact);


adminRouter.delete("/user/delete/:userId", adminController.admin.user.userDelete);


//programm
adminRouter.post("/add/program", adminController.admin.programm.addProgramm);
adminRouter.get("/all-programs", adminController.admin.programm.listProgramm);
adminRouter.delete("/delete/program/:programId", adminController.admin.programm.deleteProgramm);
adminRouter.put("/update/program/:programId", adminController.admin.programm.editProgramm);
adminRouter.get("/detail/program/:programId", adminController.admin.programm.detailProgramm);

//about-us
adminRouter.post("/about-us", adminController.admin.about.create);
adminRouter.put("/edit/about", adminController.admin.about.edit);

//gallery
adminRouter.post("/create/gallery", adminController.admin.gallery.create);
adminRouter.get("/detail/gallery/:galleryId", adminController.admin.gallery.detail);
adminRouter.delete("/delete/gallery/:galleryId", adminController.admin.gallery.delete);
adminRouter.put("/update/gallery/:galleryId", adminController.admin.gallery.update);

module.exports = adminRouter;