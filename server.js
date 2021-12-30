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

const io = require("socket.io")(server,{
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["x-api-key"],
    credentials: true,
  },
});

app.set("io", io);
function verify(token) {
  try {
    const decoded = jwt.verify(token, config.secret);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors( {
  credentials: true,
  allowedHeaders: ["Content-Type", "x-api-key","Access-Control-Allow-Origin"],
  exposedHeaders: ["sessionId"],
  origin: config.allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
}));

app.use(express.static(path.join(__dirname, "./uploads")));

io.on("connection", (socket) => {
  const token = socket.request.headers["x-api-key"];
  if (token) {
    const userData = verify(token);
    if (userData) {
      socket.join(userData.id);
      console.log(userData.id)
      io.to(userData.id).emit("welcome",{message:'You are joined now'})
    }
  }
});

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT || 3001;
server.listen(port, console.log("server is listening on 3001"));