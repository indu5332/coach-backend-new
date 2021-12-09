const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  HOST:"https://e13e-103-240-195-253.ngrok.io",
  host:"http://localhost:3001",
  allowedOrigins: ["http://localhost:4000","https://e13e-103-240-195-253.ngrok.io"],
  fileUrl: "https://e13e-103-240-195-253.ngrok.io",
  tokenDuration: "30d"
};