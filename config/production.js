const path=require('path')
module.exports = {
  "hosts": ["https://coach-backend-new.herokuapp.com/"],
  allowedOrigins: ["https://coach-backend-new.herokuapp.com/"],
  DB_HOST:process.env.DB_HOST,
  HOST:"https://coach-backend-new.herokuapp.com",
  host:"https://coach-champion-admin.web.app",
  secret: process.env.secret,
  tokenDuration: "30d",
  fileUrl: "https://coach-backend-new.herokuapp.com",
};