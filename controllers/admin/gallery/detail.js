const galleryService = require("../../service/gallery.service");
const mongoose=require('mongoose')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let detail = async (req, res) => {
  try {
    let gallery = await galleryService.findgallery({_id:mongoose.Types.ObjectId(req.params.galleryId)});
    if (gallery.length>0) {
            gallery=JSON.parse(JSON.stringify(gallery[0]))
            gallery.file = galleryService.galleryImage(gallery.file)
      return res.status(200).json({
        success: true,
        message: "gallery list",
        gallery: gallery,
      });
    }
    else{
        return res.status(400).json({
            success: false,
            message: "no gallery found"
          });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [detail];