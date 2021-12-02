const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  HOST:"https://8d4f-103-240-193-15.ngrok.io",
  allowedOrigins: ["http://localhost:4000","https://8d4f-103-240-193-15.ngrok.io"],
  fileUrl: "https://5dbd-103-240-193-15.ngrok.io",
  tokenDuration: "30d"
};