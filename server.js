require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("config");
var bodyParser = require("body-parser");
require("./database/database");
const routes = require("./routes/appRoutes");
const Adminroutes = require("./routes/adminRoutes");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://coachfabienchampion.web.app",
      "https://coach-champion-admin.web.app",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["x-api-key"],
    credentials: true,
  },
});

app.set("io", io);

const verifyToken = require("./middleware/authentication");

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, "./uploads")));

io.on("connection", (socket) => {
  if (
    !socket.request.headers["x-api-key"] ||
    socket.request.headers["x-api-key"] === null ||
    socket.request.headers["x-api-key"] === undefined
  ) {
    console.log("login to join");
    io.to(socket.id).emit("error", { message: "login to join socket" });
  } else {
    const userData = verifyToken.authentication(
      socket.request.headers["x-api-key"]
    );
    if (userData.length > 0) {
      socket.join(userData[0].id);
      console.log(userData[0].id);
      io.to(userData[0].id).emit("welcome", { message: "You are joined now" });
    }
  }
});

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT || 3001;
server.listen(port, console.log("server is listening on 3001"));
