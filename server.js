const path = require("path");
const config = require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./database/database");
const routes = require("./routes/appRoutes");
const Adminroutes = require("./routes/adminRoutes");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "x-api-key"],
  exposedHeaders: ["sessionId"],
  origin: config.allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.use("/api/public", express.static(path.join(`${__dirname}/uploads/`)));

//Routes
app.use("/api/v1", routes);
app.use("/admin", Adminroutes);

//Port listen in 3000
app.listen(4000, console.log("server is listening on 4000"));
