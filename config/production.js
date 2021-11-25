module.exports = {
  "hosts": ["https://just-order-api.herokuapp.com/","*"],
  allowedOrigins: ["https://just-order-api.herokuapp.com/","*"],
  DB_HOST:"https://just-order-api.herokuapp.com/",
  "VERSION":"v1",
  secret: process.env.secret,
  imagePath: path.join(__dirname, "../uploads/"),
  fileUrl: "https://just-order-api.herokuapp.com/",
};
