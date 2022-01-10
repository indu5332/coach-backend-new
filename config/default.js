const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  hosts: [
    "https://36c3-150-242-87-245.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001"
  ],
  HOST:["https://36c3-150-242-87-245.ngrok.io","http://localhost:3000"],
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["https://36c3-150-242-87-245.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  fileUrl: "https://36c3-150-242-87-245.ngrok.io",
  tokenDuration: "30d"
};