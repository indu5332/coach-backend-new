const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const userSchema = new Scheam(
  {
    id: { type: Number },
    isAdmin: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    imagePath: { type: String, default: "profile.png" },
    password: { type: String, required: true },
    phone: { type: Number },
    verificationToken: { type: String },
    Duration: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { inc_field: "id", id: "userId" });
module.exports = mongoose.model("user", userSchema);
