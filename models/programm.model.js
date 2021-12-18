const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const programSchema = new Schema(
  {
    id: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String, required: true },
    date: { type: Date },
    location: { type: String, required: true },
    title: { type: String },
    aboutProgram: { type: String },
    description: { type: String },
    isOpen: { type: Number },
    isClose: { type: Number },
    isPublic: { type: Boolean, default: true },
    event: { type: String, required: true },
    detail_1: { type: String, required: true },
    detail_2: { type: String },
    detail_3: { type: String },
    detail_4: { type: String },
    description: { type: String, required: true },
    coverfile: {
      url: { type: String },
      isImage: { type: Boolean, default: true },
      isVideo: { type: Boolean, default: false },
    },
    file: [
      {
        url: { type: String },
        isImage: { type: Boolean, default: true },
        isVideo: { type: Boolean, default: false },
      },
    ]
  },
  {
    timestamps: true,
  }
);

programSchema.plugin(AutoIncrement, { inc_field: "id", id: "programId" });
module.exports = mongoose.model("program", programSchema);