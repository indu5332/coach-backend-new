module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  allowedOrigins: ["https://coach-backend-new.herokuapp.com/"],
  imagePath: path.join(__dirname, "../uploads/"),
  fileUrl: "https://coach-backend-new.herokuapp.com/",
};
