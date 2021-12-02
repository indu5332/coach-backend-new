const path=require('path')
module.exports = {
  "hosts": ["https://coach-backend-new.herokuapp.com/"],
  allowedOrigins: ["https://coach-backend-new.herokuapp.com/"],
  DB_HOST:process.env.DB_HOST,
  HOST:"https://coach-backend-new.herokuapp.com",
  "VERSION":"v1",
  secret: process.env.secret,
  fileUrl: "https://coach-backend-new.herokuapp.com",
};