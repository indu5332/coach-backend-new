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
  allowedOrigins: ["http://localhost:4000","https://e13e-103-240-195-253.ngrok.io"],
  fileUrl: "https://583b-103-227-71-169.ngrok.io",
  tokenDuration: "30d"
};