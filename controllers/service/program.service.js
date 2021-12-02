const bcrypt = require("bcryptjs");
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

  updateProgram: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await programModel.updateOne(conditions, dataToUpdate);
      return updateResult.modifiedCount > 0;
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  programImage: function (url){
    return config.fileUrl+"/programs/" + url;
}
}

