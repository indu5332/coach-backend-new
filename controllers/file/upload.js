module.exports = async (req, res) => {
  try {
    if(req.file){
        return res.status(200).json({
            success:true,
            message:"image uploaded successfully",
            file:req.file.filename
        });
    }
    else {
        return res.status(500).json({
            success:false,
            message:"No image found"
        })
    }
} catch (error) {
  console.log(error)
    return res.status(500).json({
        success:false,
        isError:true,
        error:error.message
    })
}
};
