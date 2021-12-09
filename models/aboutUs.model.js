const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const aboutSchema = new Scheam(
  {
    id: { type: Number },
    email: { type: String },
    phone: { type: String },
    instagramLink: { type: String },
    facebookLink: { type: String },
    linkdinLink: { type: String },
    twitterLink: { type: String },
  },
  {
    timestamps: true,
  }
);

aboutSchema.plugin(AutoIncrement, { inc_field: "id", id: "aboutId" });
module.exports = mongoose.model("about", aboutSchema);
