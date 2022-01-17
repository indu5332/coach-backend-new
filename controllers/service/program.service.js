var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programModel = require("../../models/programm.model");
const config = require("config");

module.exports = {
  async findprogram(data) {
    try {
      const program = await programModel.find(data);
      return JSON.parse(JSON.stringify(program));
    } catch (error) {
      createError(500, error);
    }
  },

  createProgram: async (program) => {
    try {
      const newProgram = await programModel.create(program);
      return newProgram;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  updateProgram: async (_id, data) => {
    try {
      const updateResult = await programModel.findByIdAndUpdate(_id, data, {
        new: true,
      });
      return updateResult;
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  programImage: function (url) {
    if(!url || url===undefined){
      return config.fileUrl+"/programs/dummy.jpg" ;
    }
    else{
      return config.fileUrl+"/programs/" + url;
    }
  },

  getExtension(url) {
    const parts = url.split(".");
    return parts[parts.length - 1];
  },

  isImage(url) {
    if (url === null || url === undefined) {
      return false;
    }
    const ext = this.getExtension(url);
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
  isVideo(url) {
    if (url === null || url === undefined) {
      return false;
    }
    const ext = this.getExtension(url);
    switch (ext.toLowerCase()) {
      case "m4v":
      case "avi":
      case "mpg":
      case "mp4":
      case "MOV":
      case "mov":
      case "mp3":
        return true;
    }
    return false;
  },
};
