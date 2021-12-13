const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const gallerySchema = new Scheam(
  {
    id: { type: Number },
    file: { type: String },
    isImage:{type:Boolean,default:true},
    isVideo:{type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);

gallerySchema.plugin(AutoIncrement, { inc_field: "id", id: "galleryId" });
module.exports = mongoose.model("gallery", gallerySchema);
