const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const vpaSchema = new Schema(
  {
    id: { type: Number },
    RID: { type: String, required: true, unique: true },
    name_KH: { type: String, required: true },
    nationality_KH: { type: String, required: true },
    ethnicity_KH: { type: String },
    name_EN: { type: String, required: true },
    nationality_EN: { type: String, required: true },
    ethnicity_EN: { type: String },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    birthPlace_City: { type: String, required: true },
    birthPlace_District: { type: String, required: true },
    birthPlace_Commune: { type: String },
    dateOFBirth: { type: Date, required: true },
    occupation_KH: { type: String, required: true },
    occupation_EN: { type: String, required: true },
    currentLocation_City: { type: String, required: true },
    currentLocation_District: { type: String, required: true },
    currentLocation_Commune: { type: String },
    dateMainCrime: { type: Date, required: true },
    mainCrimeLocation: { type: String, required: true },
    mainCrimeDescription_KH: { type: String, required: true },
    mainCrimeDescription_EN: { type: String, required: true },
    otherCrime_KH: { type: String },
    otherCrime_EN: { type: String },
    modeParticipation_KH: { type: String, required: true },
    modeParticipation_EN: { type: String, required: true },
    petitioner: { type: String },
    formCompletionDate: { type: String },
    requestProtectiveMeasure_KH: { type: String },
    requestProtectiveMeasure_EN: { type: String },
    reparationForm_KH: { type: String },
    reparationForm_EN: { type: String },
    copyright: { type: String },
    publish: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
vpaSchema.plugin(AutoIncrement, { inc_field: "id", id: "vpaId" });
module.exports = mongoose.model("vpa", vpaSchema);
