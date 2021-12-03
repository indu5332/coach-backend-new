var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const contactModel = require("../../../models/contact.model");
const mongoose=require('mongoose')

const editContact = async (req, res) => {
  try {
    const updateRes=await contactModel.updateOne({_id:mongoose.Types.ObjectId(req.params.contactId)},{$set:req.body})
    if(updateRes.modifiedCount>0){
        return res.status(200).json({
            status:true,
            message:"contact updated successfully",
            updateRes:updateRes
        })
    }
    else{
        return res.status(400).json({
            status:false,
            message:"fail to update contact"
        })
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = editContact;