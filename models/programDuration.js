const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const programDuration = new Schema(
  {
    id: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    totalDuration: { type: Number },
    title: { type: String },
    description: { type: String },
    programId: {type: Schema.Types.ObjectId, ref: "program"},
    day: { type: Number },
    durationCoverImage: {
      url: { type: String },
      isImage: { type: Boolean, default: true },
      isVideo: { type: Boolean, default: false },
    },
    durationEvent: [
      {
        durationTitle: { type: String },
        file: [
          {
            url: { type: String },
            isImage: { type: Boolean, default: true },
            isVideo: { type: Boolean, default: false },
            title: { type: String },
            description: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

programDuration.plugin(AutoIncrement, { inc_field: "id", id: "programDuration" });
module.exports = mongoose.model("programDuration", programDuration);
