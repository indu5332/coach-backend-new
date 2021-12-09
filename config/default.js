const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  HOST:"https://b1f4-103-240-195-253.ngrok.io",
  allowedOrigins: ["http://localhost:4000","https://b1f4-103-240-195-253.ngrok.io"],
  fileUrl: "https://b1f4-103-240-195-253.ngrok.io",
  tokenDuration: "30d"
};