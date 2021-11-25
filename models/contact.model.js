const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const contactSchema = new Scheam(
  {
    id: { type: Number },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

contactSchema.plugin(AutoIncrement, { inc_field: "id", id: "contactId" });
module.exports = mongoose.model("contact", contactSchema);
