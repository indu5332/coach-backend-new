const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(config.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;
database.on("error", (error) => {
  console.error.bind("error", "connect error");
});
database.once("open", () => {
  console.log("We are connected");
});