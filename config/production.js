const path=require('path')
module.exports = {
  allowedOrigins: ["https://coach-backend-new.herokuapp.com"],
  DB_HOST:process.env.DB_HOST,
  HOST:"https://coach-backend-new.herokuapp.com",
  host:"https://coach-champion-admin.web.app",
  hosts: [
    "https://coach-backend-new.herokuapp.com",
    "https://e13e-103-240-195-253.ngrok.io"
  ],
  secret: process.env.secret,
  tokenDuration: "30d",
  fileUrl: "https://coach-backend-new.herokuapp.com",
};