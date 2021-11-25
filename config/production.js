const path=require('path')
module.exports = {
  "hosts": ["https://coach-backend-new.herokuapp.com/","*"],
  allowedOrigins: ["https://coach-backend-new.herokuapp.com/","*"],
  DB_HOST:process.env.DB_HOST,
  "VERSION":"v1",
  secret: process.env.secret,
  imagePath: path.join(__dirname, "../uploads/"),
  fileUrl: "https://coach-backend-new.herokuapp.com/",
};
