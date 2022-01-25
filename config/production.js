const path=require('path')

module.exports = {
  allowedOrigins: ["https://coach-backend-new.herokuapp.com","http://localhost:3001","http://localhost:3000","http://localhost:3002","https://coachfabienchampion.web.app","https://coach-champion-admin.web.app"],
  DB_HOST:process.env.DB_HOST,
  aws: {
    ID: "AKIAVIVJLKCPQREO6PQS",
    KEY: "oUgmchj+4B2k8jdXqqW3QYIQxHAbfEGYAQuHCmJP",
  },
  bucket: "coachfabienchampion",
  HOST:["https://coach-backend-new.herokuapp.com","http://localhost:3000","https://coachfabienchampion.web.app","https://coach-champion-admin.web.app"],
  host:"https://coach-champion-admin.web.app",
  hosts: [
    "https://coach-backend-new.herokuapp.com","http://localhost:3000","http://localhost:3001","https://coachfabienchampion.web.app","https://coach-champion-admin.web.app"
  ],
  secret: process.env.secret,
  tokenDuration: "30d",
  fileUrl: "https://coach-backend-new.herokuapp.com",
};