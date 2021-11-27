const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const programSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    date: { type: Date },
    location: { type: String, required: true },
    event: { type: String, required: true },
    detail_1: { type: String, required: true },
    detail_2: { type: String },
    detail_3: { type: String },
    detail_4: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

programSchema.plugin(AutoIncrement, { inc_field: "id", id: "programId" });
module.exports = mongoose.model("program", programSchema);
