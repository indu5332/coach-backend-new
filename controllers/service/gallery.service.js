var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const galleryModel = require("../../models/gallery.model");
const config = require("config");
const path = require("path");

module.exports = {
  async findgallery(data) {
    try {
      const gallery = await galleryModel.find(data);
      return JSON.parse(JSON.stringify(gallery));
    } catch (error) {
      createError(500, error);
    }
  },

  creategallery: async (gallery) => {
    try {
      const newgallery = await galleryModel.create(gallery);
      return newgallery;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  listgallery: async () => {
    try {
      const list = await galleryModel.find({});
      return JSON.parse(JSON.stringify(list));
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  updategallery: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await galleryModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  galleryImage: function (url){
    return config.fileUrl+"/gallery/" + url;
  },

  getExtension(file) {
    const parts = file.split(".");
    return parts[parts.length - 1];
  },
  
  isImage(file) {
    if (file === null || file === undefined) {
      return false;
    }
    const ext = this.getExtension(file);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
      case "jpeg":
        return true;
    }
    return false;
  },
  isVideo(file) {
    if (file === null || file === undefined) {
      return false;
    }
    const ext = this.getExtension(file);
    switch (ext.toLowerCase()) {
      case "m4v":
      case "mp3":
      case "avi":
      case "mpg":
      case "mp4":
      case "MOV":
      case "mov":
        return true;
    }
    return false;
  },

  totalGallery:async function(){
    return await galleryModel.countDocuments({});
},
}