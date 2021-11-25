let mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../../models/user.model");

//get user Detail
let getUserDetail = async (req, res, next) => {
  try {
    //console.log("jgh")
    if(req.params.userId==='me'){
        console.log(req.params.userId)
        const user=await userModel.find({_id:mongoose.Types.ObjectId(req.decoded._id)})
        if(user.length>0){
            return res.status(200).json({
                success:true,
                user:user[0]
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"no details found"
            })
        }
    }
    else{
        if (req.decoded.isAdmin===true ) {
            const user=await userModel.find({_id:mongoose.Types.ObjectId(req.params.userId)})
            if (user.length>0) {
                return res.status(200).json({
                    success:true,
                    user:user[0]
                })
            } else {
                return res.status(404).json({
                    success:false,
                    message:"no user found"
                })
            }
        } else {
            return res.status(400).json({
                success:false,
                message:"fail to authenticate admin"
            })
        }
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [getUserDetail];
