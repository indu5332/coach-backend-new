var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const contactModel = require("../../../models/contact.model");

const contactList = async (req, res) => {
  try {
    const conditions = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip:
          (req.query.page ? Number(req.query.page) : 0) *
          (req.query.limit ? Number(req.query.limit) : 10),
      },
      {
        $limit: req.query.limit ? Number(req.query.limit) : 10,
      },
    ];
    const contactList = await contactModel.aggregate(conditions);
    return res.status(200).json({
      success: true,
      message: "contact list",
      contactList: contactList,
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = contactList;
