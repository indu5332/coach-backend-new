const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  hosts: [
    "https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001"
  ],
  HOST:["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000"],
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  fileUrl: "https://6f82-49-36-182-30.ngrok.io",
  tokenDuration: "30d"
};