const mongoose = require("mongoose");
const { Schema } = mongoose;

const BodyPartsSchema = new mongoose.Schema({
  face: { type: Boolean, required: true, default: false },
  arms: { type: Boolean, required: true, default: false },
  armpits: { type: Boolean, required: true, default: false },
  legs: { type: Boolean, required: true, default: false },
  bikini: { type: Boolean, required: true, default: false },
  back: { type: Boolean, required: true, default: false },
  abs: { type: Boolean, required: true, default: false },
});

const treatmentSchema = new mongoose.Schema({
  cleaning: { type: Boolean, required: true, default: false },
  botox: { type: Boolean, required: true, default: false },
  mesotherapy: { type: Boolean, required: true, default: false },
  dermopen: { type: Boolean, required: true, default: false },
  fillers: { type: Boolean, required: true, default: false },
});

const PlannedTreatmentSchema = new Schema({
  plannedFaceTreatment: { type: treatmentSchema, required: true },
  plannedBodyParts: { type: BodyPartsSchema, required: true },
  plannedBodyTreatment: { type: Boolean, required: true, default: false },
});

const clientSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: false },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: { type: Number, required: false },
  birthday: { type: Date, required: false },
  status: {
    type: String,
    enum: ["new", "in-progress", "done"],
    required: true,
    default: "new",
  },
  plannedTreatment: { type: PlannedTreatmentSchema, required: true },
  pdfId: { type: String, required: false },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
