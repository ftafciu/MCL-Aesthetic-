const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
  date: {
    type: Date,
    required: true
  },
  comment: { type: String, required: true },
  type: { type: String, required: true },
  pictures: { type: [String], required: false },
  price: { type: Number, required: true }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
