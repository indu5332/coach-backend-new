// const programmModel = require("../../../models/programm.model");
// const programService = require("../../service/program.service");
// const mongoose=require('mongoose')

// const pushFile = async (req, res, next) => {
//   try {
//     const files = {
//         url: req.body.file,
//         isImage: programService.isImage(req.body.file),
//         isVideo: programService.isVideo(req.body.file),
//       };
//       req.body.file=files
//     let conditions = {
//         _id: mongoose.Types.ObjectId(req.params.programId),
//       };
//       let dataToUpdate = {
//         $push: {
//           file:{
//             $each:req.body.file
//           }
//         },
//       };  
//       let updateRes = await programmModel.findOneAndUpdate(conditions,dataToUpdate); 
//       console.log(updateRes)
//     if (updateRes) {
//         //updateRes.file.url=programService.programImage(updateRes.file.url)
//       return res.status(200).json({
//         success: true,
//         message: "program created",
//         program: updateRes
//       });
//     }
//     else{
//       return res.status(500).json({
//         success: false,
//         message: "failed to create program",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: error,
//     });
//   }
// };

// module.exports = [pushFile];