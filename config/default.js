const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  bucket: "coach",
  HOST:"https://744c-103-227-70-207.ngrok.io",
  allowedOrigins: ["http://localhost:4000","https://744c-103-227-70-207.ngrok.io"],
  fileUrl: "https://744c-103-227-70-207.ngrok.io",
  tokenDuration: "30d"
};