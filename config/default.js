const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  sgMail:process.env.sgMail,
  aws: {
    ID: "AKIAVIVJLKCP3JWPSH4Q",
    KEY: "e2xcoihXHkGL/5IZmmvPiuTpAY3jodynKolkIpW+",
  },
  bucket: "coachfabienchampion",
  hosts: [
    "https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001"
  ],
  HOST:["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000"],
  host:"https://coach-champion-admin.web.app",
  allowedOrigins: ["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  fileUrl: "https://bba5-2405-201-5800-a0e9-b0cb-6808-ddf5-5d57.ngrok.io",
  tokenDuration: "30d"
};