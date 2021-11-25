var createError = require("http-errors");
const contactSchema = require("../../../models/contact.model");
const httpStatus = require("http-status-codes").StatusCodes;

//create a new user
const createContact = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const newContact = await contactSchema.create(data);
    if (newContact) {
      res.status(200).json({
        success: true,
        message: "Query submitted successfully",
      });
    } else {
      return res.status(500).json({
        success: false,

        error: err.message,
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [createContact];
