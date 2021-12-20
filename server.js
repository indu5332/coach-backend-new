require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path=require('path')
const config=require('config')
var bodyParser = require("body-parser");
require("./database/database");
const routes = require("./routes/appRoutes");
const Adminroutes = require("./routes/adminRoutes");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server)

io.on("connection", socket => {

  socket.send("Hello!");

  socket.emit("greetings", "Hey!");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname,"./uploads")));

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT||3001
server.listen(port, console.log("server is listening on 3001"));