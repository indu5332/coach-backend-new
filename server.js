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

const io = require("socket.io")(server);

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

io.on("connection", (socket) => {
  const token = socket.request.headers["x-api-key"];
  if (token) {
    const userData = verify(token);
    if (userData.length > 0) {
      socket.join(userData[0].id);
      io.to(userData[0].id).emit("connected")
      console.log("userData")
    }
  }
});

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, "./uploads")));

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT || 3001;
server.listen(port, console.log("server is listening on 3001"));