const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const announcementSchema = new Scheam(
  {
    id: { type: Number },
    image: { type: String, required: true },
    pdf: { type: String  },
    language: { type: String },
    publish: { type: numb },
    },
  {
    timestamps: true,
  }
);

announcementSchema.plugin(AutoIncrement, { inc_field: "id", id: "announcementId" });
module.exports = mongoose.model("announcement", announcementSchema);
