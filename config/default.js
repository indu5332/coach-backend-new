const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  allowedOrigins: ["http://localhost:4000"],
  imagePath: path.join(__dirname, "../uploads/"),
  fileUrl: "http://192.168.0.176:3000",
};
