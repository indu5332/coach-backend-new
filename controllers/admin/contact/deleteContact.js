var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const contactModel = require("../../../models/contact.model");
const mongoose = require("mongoose");

const deleteContact = async (req, res) => {
  try {
    let deleteRes = await contactModel.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.contactId),
      });
      console.log(deleteRes)
      if (deleteRes.deletedCount > 0) {
        return res.status(200).json({
          success: true,
          message: "contact deleted",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "fail to delete contact",
        });
      }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = deleteContact;