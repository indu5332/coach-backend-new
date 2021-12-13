const galleryModel = require("../../../models/gallery.model");
const galleryService=require('../../service/gallery.service')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const mongoose=require('mongoose');
const { isVideo } = require("../../service/gallery.service");

let addGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.create({ ...req.body });
    if (gallery) {
      if(galleryService.isImage(req.body.file)){
        gallery.file = galleryService.galleryImage(gallery.file)
        return res.status(200).json({
          success: true,
          message: "gallery added successfully",
          gallery:gallery
        });
      }
      else{
        if(galleryService.isVideo(req.body.file)){
          const update=await galleryService.updategallery({_id:mongoose.Types.ObjectId(gallery._id)},{ $set: {isImage:false,isVideo:true}})
          update.file = galleryService.galleryImage(update.file)
          return res.status(200).json({
            success: true,
            message: "gallery added successfully",
            gallery: update,
          });
        }
        else{
          return res.status(404).json({
            success: true,
            message: "can't find file"
          });
        }
      } 
    }else{
      return res.status(400).json({
        success: true,
        message: "can't create gallery"
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [addGallery];