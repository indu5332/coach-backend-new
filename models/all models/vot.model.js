const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const votSchema = new Schema(
  {
    id: { type: Number },
    RID: { type: String, required: true, unique: true },
    firstName_KH: { type: String, required: true },
    lastName_KH: { type: String },
    firstName_EN: { type: String, required: true },
    lastName_EN: { type: String },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    occupation_EN: { type: String, required: true },
    occupation_KH: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    Sangat: { type: String },
    interviewer: { type: String },
    pages: { type: String },
    DOC_Date: { type: Date },
    collection_DOC_Date: { type: Date },
    source: { type: String },
    noteEnglish: { type: String },
    noteKhmer: { type: String },
  },
  {
    timestamps: true,
  }
);

votSchema.plugin(AutoIncrement, { inc_field: "id", id: "votId" });
module.exports = mongoose.model("vot", votSchema);
