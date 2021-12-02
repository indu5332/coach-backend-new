const galleryService = require("../../service/gallery.service");
const mongoose=require('mongoose')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;


let updategallery = async (req, res) => {
  try {
    const updatedRes=await galleryService.updategallery({_id:mongoose.Types.ObjectId(req.params.galleryId)},{$set:req.body})
    if(updatedRes){
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