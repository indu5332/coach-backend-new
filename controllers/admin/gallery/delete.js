const galleryModel = require("../../../models/gallery.model");
const mongoose=require('mongoose')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

//delete gallery
let deleteGallery = async (req, res) => {
  try {
    const deletedRes = await galleryModel.deleteOne({_id:mongoose.Types.ObjectId(req.params.galleryId) });
    if (deletedRes.deletedCount>0) {
      return res.status(200).json({
        success: true,
        message: "gallery deleted successfully",
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [deleteGallery];