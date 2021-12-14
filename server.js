require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path=require('path')
const config=require('config')
var bodyParser = require("body-parser");
const redis = require("redis");
require("./database/database");
const routes = require("./routes/appRoutes");
const Adminroutes = require("./routes/adminRoutes");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: config.hosts,
      methods: ["GET", "POST"],
      allowedHeaders: ["x-api-key"],
      credentials: true,
    },
});

//const socketOperation = require("./controller/app/io/operation");

const client = redis.createClient(config.redisClient, {
    no_ready_check: true,
    auth_pass: config.redisPass,
  });

client.on("error", (error) => {
    console.error(error);
});

app.set("io", io);

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname,"./uploads")));

const verifyToken = require("./middleware/verifyToken");

io.on("connection", (socket) => {
    const userData = verifyToken.authentication(socket.request.headers["x-api-key"]);
    if (userData.length > 0) {
      socketOperation.joinSocket(socket, userData[0]._id, userData[0].id);
      socket.on("send_message", async (msg) => {
        if (msg.file) {
          socketOperation.msgWithFile(msg, userData[0]._id, io, "private");
        } else if (msg.file || msg.message) {
          socketOperation.msgWithoutFile(msg, userData[0]._id, io);
        } else if (!msg.file && !msg.message) {
          socketOperation.sendBackMessageToClient(io, { message: "Empty message" }, socket.id, "invalid-message");
        }
      });
      socket.on("disconnect", (reason) => {
        socketOperation.disconnectServer(socket, userData[0]._id, reason);
      });
    }
  });

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT||3001
server.listen(port, console.log("server is listening on 3001"));
