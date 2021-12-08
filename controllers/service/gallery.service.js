var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const galleryModel = require("../../models/gallery.model");
const config = require("config");

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
}
}