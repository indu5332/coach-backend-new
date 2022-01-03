const config=require('config')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const galleryModel = require("../../../models/gallery.model");
const galleryService=require('../../service/gallery.service')

//list gallery
let galleries = async (req, res) => {
  try {
    const conditions = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: ((req.query.page ? Number(req.query.page) : 0) * (req.query.limit ? Number(req.query.limit) : 8)),
      },
      {
        $limit: (req.query.limit ? Number(req.query.limit) : 8),
      },
    ];
    const galleryList = await galleryModel.aggregate(conditions);
    const totalGalleries=await galleryService.totalGallery();
    await Promise.all(galleryList.map(async gallery=>{
        gallery.file=config.fileUrl+"/gallery/"+gallery.file
    }))
      return res.status(200).json({
        success: true,
        message: "gallery list",
        totalGalleries: totalGalleries,
        galleryList: galleryList
      });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [galleries];