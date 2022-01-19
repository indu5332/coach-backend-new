const galleryService = require("../../service/gallery.service");
const mongoose=require('mongoose')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const imageMiddleware=require('../../../middleware/image.middleware')

//update gallery
let updategallery = async (req, res) => {
  try {
    let updatedRes=await galleryService.updategallery({_id:mongoose.Types.ObjectId(req.params.galleryId)},{$set:req.body})
    if(updatedRes){
      console.log(updatedRes)
      updatedRes.image = await imageMiddleware.getFiles(`gallery/${updatedRes.image}`)
      updatedRes.video = await imageMiddleware.getFiles(`gallery/${updatedRes.video}`)
        return res.status(200).json({
            status:true,
            message:"gallery updated successfully",
            updatedRes:updatedRes
        })
    }
    else{
        return res.status(400).json({
            status:false,
            message:"unable to update gallery",
            updatedRes:updatedRes
        })
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [updategallery];