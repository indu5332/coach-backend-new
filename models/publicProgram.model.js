const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const publiProgramSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    about:{type:String},
    isClose: { type: Boolean ,default:false},
    description: { type: String, required: true },
    descriptionImage:[
        {
          url: { type: String },
          isImage: { type: Boolean, default: true },
          isVideo: { type: Boolean, default: false },
        },
      ],
    coverfile:[ {
      url: { type: String },
      isImage: { type: Boolean, default: true },
      isVideo: { type: Boolean, default: false },
      }
    ],
    aboutProgramImage: [
      {
        url: { type: String },
        isImage: { type: Boolean, default: true },
        isVideo: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

publiProgramSchema.plugin(AutoIncrement, { inc_field: "id", id: "publicProgramId" });
module.exports = mongoose.model("publiProgram", publiProgramSchema);
