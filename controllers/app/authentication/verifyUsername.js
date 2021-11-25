const authService=require('../../service/user.service')
var createError = require('http-errors')
const httpStatus=require('http-status-codes').StatusCodes;

const verifyUsername=async(req,res)=>{
try {
          const data = { username: req.body.username };
          const user = await authService.findUser(data);
          if (user.length === 0) {
            return res.status(200).json({
              success: true,
              message: "User Name Available",
            });
          }
          else{
            return res
            .status(406)
            .json({ success: false, message: "User Name Already Exists" });
          }
       } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error)
}
}
module.exports=verifyUsername