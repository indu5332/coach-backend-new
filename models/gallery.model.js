const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const gallerySchema = new Scheam(
  {
    id: { type: Number },
    image: { type: String },
    video: { type: String },
  },
  {
    timestamps: true,
  }
);

gallerySchema.plugin(AutoIncrement, { inc_field: "id", id: "galleryId" });
module.exports = mongoose.model("gallery", gallerySchema);
