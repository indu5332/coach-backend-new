const galleryModel = require("../../../models/gallery.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let deleteGallery = async (req, res) => {
  try {
    const deletedRes = await galleryModel.deleteOne({ ...req.body });
    if (deletedRes.deletedCount>0) {
      return res.status(200).json({
        success: true,
        message: "gallery deleted successfully",
        deletedRes: deletedRes,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [deleteGallery];