const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: { type: String, required: true },
    role: { type: Number },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    status: { type: Number, required: true },
    file: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { inc_field: "id", id: "userId" });
module.exports = mongoose.model("user", userSchema);
