const galleryService = require("../../service/gallery.service");
const config=require('config')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let galleries = async (req, res) => {
  try {
    const galleryList = await galleryService.listgallery({});
    await Promise.all(galleryList.map(async gallery=>{
        gallery.image=config.fileUrl+"/gallery/"+gallery.image
        gallery.video=config.fileUrl+"/gallery/"+gallery.video
    }))
    console.log(galleryList)
      return res.status(200).json({
        success: true,
        message: "gallery list",
        galleryList: galleryList,
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [galleries];