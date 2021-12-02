const galleryModel = require("../../../models/gallery.model");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let addGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.create({ ...req.body });
    if (gallery) {
      return res.status(200).json({
        success: true,
        message: "gallery added successfully",
        gallery: gallery,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [addGallery];