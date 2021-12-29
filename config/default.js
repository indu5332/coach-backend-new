const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  hosts: [
    "https://e058-150-129-238-127.ngrok.io"
  ],
  HOST:"https://e058-150-129-238-127.ngrok.io",
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["http://localhost:3001","https://e058-150-129-238-127.ngrok.io","http://localhost:3000","http://localhost:3002"],
  fileUrl: "https://e058-150-129-238-127.ngrok.io",
  tokenDuration: "30d"
};