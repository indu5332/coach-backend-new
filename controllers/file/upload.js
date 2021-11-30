module.exports=async (req, res) => {
  if(req.file){
      
      return res.status(200).json({
          success: true,
          message: 'File uploaded successfully',
          file: req.file.filename
      })
  }
  else{
    return res.status(200).json({
      success: false,
      message: 'error'
  })
  }
}