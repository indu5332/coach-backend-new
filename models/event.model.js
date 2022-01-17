const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const eventSchema = new Scheam(
  {
    id: { type: Number },
    name: { type: String },
    email: { type: String },
    date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    detail: { type: String },
  },
  {
    timestamps: true,
  }
);

eventSchema.plugin(AutoIncrement, { inc_field: "id", id: "eventId" });
module.exports = mongoose.model("event", eventSchema);