const mongoose = require("mongoose");

const BodyPartsSchema = new mongoose.Schema({
  face: { type: Boolean, required: true, default: false },
  arms: { type: Boolean, required: true, default: false },
  armpits: { type: Boolean, required: true, default: false },
  legs: { type: Boolean, required: true, default: false },
  bikini: { type: Boolean, required: true, default: false },
  back: { type: Boolean, required: true, default: false },
  abs: { type: Boolean, required: true, default: false },
  gluteus_area: { type: Boolean, required: true, default: false },
});

const laserSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  date: { type: Date, required: true },
  bodyParts: { type: BodyPartsSchema, required: true },
  type: { type: String, required: true, default: "Laser treatment" },
});

const laserModel = mongoose.model("LaserSession", laserSchema);

module.exports = laserModel;
