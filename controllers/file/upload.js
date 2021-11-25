module.exports = async (req, res) => {
    try {
      if (req.file) {
        return res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          file: req.file.filename,
        });
      }
  
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    } catch (error) {
      return res.status(500).json({ success: false, isError: true, error: error.message });
    }
  };