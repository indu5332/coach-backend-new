const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const programSchema = new Schema(
  {
    id: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    programName: { type: String, required: true },
    startDate: { type: Date },
    isClose:{type:Boolean},
    endDate: { type: Date },
    aboutProgram: { type: String },
    action: { type: Boolean },
    pdfUrl: { type: String },
    programCoverImageUrl: { type: String },
    events:[
      { 
      eventName: { type: String },
      eventDescription: { type: String },
      url: { type: String },
      isImage:{ type: Boolean, default: true },
      isVideo:{ type: Boolean, default: false },
      }
    ],
    dietVideoUrl:{type:String}
  },
  {
    timestamps: true,
  }
);

programSchema.plugin(AutoIncrement, { inc_field: "id", id: "programId" });
module.exports = mongoose.model("program", programSchema);
