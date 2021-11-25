require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path=require('path')
require("./database/database");
const routes = require("./routes/appRoutes");
const Adminroutes = require("./routes/adminRoutes");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname,"./uploads")));

//Routes
app.use("/api/v1", routes);
app.use("/api/v1/admin", Adminroutes);

//Port listen in 3000
const port = process.env.PORT||4000
app.listen(port, console.log("server is listening on 4000"));
