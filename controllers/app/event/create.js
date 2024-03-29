var createError = require("http-errors");
const eventSchema = require("../../../models/event.model");
const httpStatus = require("http-status-codes").StatusCodes;

//create a new user
const createEvent = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const newEvent = await eventSchema.create(data);
    if (newEvent) {
      res.status(200).json({
        success: true,
        message: "Query submitted successfully",
        newEvent:newEvent
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

module.exports = [createEvent];