const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  allowedOrigins: ["https://177b-150-242-60-254.ngrok.io","http://localhost:4000"],
  imagePath: path.join(__dirname, "../uploads/"),
  fileUrl: "https://177b-150-242-60-254.ngrok.io",
};
