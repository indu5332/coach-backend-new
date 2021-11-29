const multer = require("multer");
const Path = require("path");

const p = Path.join(`${__dirname}../../uploads/`);

const storage = multer.diskStorage({
  destination: (req, res, cb) => { cb(null, p+req.query.folder); },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

module.exports = multer({ storage: storage }).single("file");