const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  hosts: [
    "http://localhost:3001",
    "https://e13e-103-240-195-253.ngrok.io"
  ],
  HOST:"https://e13e-103-240-195-253.ngrok.io",
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["http://localhost:3001","https://e13e-103-240-195-253.ngrok.io"],
  fileUrl: "https://dbf9-150-129-183-62.ngrok.io",
  tokenDuration: "30d"
};