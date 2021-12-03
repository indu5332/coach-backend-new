const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  HOST:"https://825b-103-240-193-15.ngrok.io",
  allowedOrigins: ["http://localhost:4000","https://825b-103-240-193-15.ngrok.io"],
  fileUrl: "https://825b-103-240-193-15.ngrok.io",
  tokenDuration: "30d"
};