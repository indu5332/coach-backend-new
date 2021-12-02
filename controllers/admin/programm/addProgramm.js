const programService = require("../../service/program.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

let addProgram = async (req, res) => {
  try {
    const program = await programService.createProgram({ ...req.body });
    if (program) {
      return res.status(200).json({
        success: true,
        message: "programm added successfully",
        program: program[0],
      });
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [addProgram];
