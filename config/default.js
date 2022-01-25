const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  aws: {
    ID: "AKIAVIVJLKCPQREO6PQS",
    KEY: "oUgmchj+4B2k8jdXqqW3QYIQxHAbfEGYAQuHCmJP",
  },
  bucket: "coachfabienchampion",
  hosts: [
    "https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001"
  ],
  HOST:["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000"],
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  fileUrl: "https://417a-2405-201-5800-a0e9-1d09-71f2-ba43-c3b6.ngrok.io",
  tokenDuration: "30d"
};