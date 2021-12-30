
   
const path=require('path')
module.exports = {
  allowedOrigins: ["https://coach-backend-new.herokuapp.com","http://localhost:3001","http://localhost:3000","http://localhost:3002","https://coachfabienchampion.web.app"],
  DB_HOST:process.env.DB_HOST,
  HOST:["https://coach-backend-new.herokuapp.com","http://localhost:3000","https://coachfabienchampion.web.app"],
  host:"https://coach-champion-admin.web.app",
  hosts: [
    "https://coach-backend-new.herokuapp.com","http://localhost:3000","http://localhost:3001","https://coachfabienchampion.web.app"
  ],
  secret: process.env.secret,
  tokenDuration: "30d",
  fileUrl: "https://coach-backend-new.herokuapp.com",
};