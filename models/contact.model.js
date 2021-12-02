const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
contactSchema.plugin(AutoIncrement, { inc_field: "id", id: "contactId" });
module.exports = mongoose.model("contact", contactSchema);