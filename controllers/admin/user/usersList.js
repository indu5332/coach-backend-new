var createError = require('http-errors')
const httpStatus=require('http-status-codes').StatusCodes;
const userModel = require('../../../models/user.model');
const userService=require('../../service/user.service')

//list users
const userList = async (req,res, next) => {
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
       {
        $project: {
          _id: 1,
          id: 1,
          firstName: 1,
          lastName: 1,
          username:1,
          email: 1,
          phone: 1,
          createdAt: 1,
          imagePath: 1,
        },
      },
     ];
     const userList = await userModel.aggregate(conditions);
     req.data={}
     req.data.userList=userList
     next()
     } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error)
   }
 };

 const totalUser=async(req,res)=>{
  try {
    const totalUsers = await userModel.find({});
    await Promise.all(
      req.data.userList.map(async (users) => {
        users.imagePath =await userService.userImage(
          users.imagePath
        );
      })
    );
    return res.status(200).json({
      success: true,
      message: "users list",
      totalUsers:totalUsers.length,
      userList: req.data.userList
    });
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}
module.exports=[userList,totalUser];