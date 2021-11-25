var createError = require('http-errors')
const httpStatus=require('http-status-codes').StatusCodes;
const userModel = require('../../../models/user.model');

const userList = async (req, res, next) => {
   try {
     const conditions = [
       {
         $sort: {
           createdAt: -1,
         },
       },
       {
         $skip: ((req.query.page ? Number(req.query.page) : 0) * (req.query.limit ? Number(req.query.limit) : 10)),
       },
       {
         $limit: (req.query.limit ? Number(req.query.limit) : 10),
       },
     ];
     const userList = await userModel.aggregate(conditions);
     return res.status(200).json({
       success: true,
       message: "users list",
       userList: userList,
     });
   } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error)
   }
 };
module.exports=userList;