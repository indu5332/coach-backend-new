var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const programDurationModel = require("../../models/programDuration.model");
const config = require("config")

module.exports = {
  async findprogramDuration(data) {
    try {
      const programDuration = await programDurationModel.find(data);
      return JSON.parse(JSON.stringify(programDuration));
    } catch (error) {
      createError(500, error);
    }
  },

  createprogramDuration: async (programDuration) => {
    try {
      const newprogramDuration = await programDurationModel.create(programDuration);
      return newprogramDuration;
    } catch (error) {
      console.log(error);
    }
  },

  updateprogramDuration: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await programDurationModel.findByIdAndUpdate(
        conditions,
        dataToUpdate,
        {new:true}
      );
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  programDurationImage: function (url) {
    return config.fileUrl + "/program/" + url;
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