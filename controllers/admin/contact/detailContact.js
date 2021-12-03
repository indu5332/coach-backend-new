var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const contactModel = require("../../../models/contact.model");
const mongoose = require("mongoose");

const detailContact = async (req, res) => {
  try {
    let detail = await contactModel.find({
        _id: mongoose.Types.ObjectId(req.params.contactId),
      });
      if (detail.length > 0) {
        return res.status(200).json({
          success: true,
          message: "contact details",
          detail:detail[0]
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "fail to detail contact",
        });
      }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = detailContact;