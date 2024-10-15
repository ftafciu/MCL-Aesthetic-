const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
  date: {
    type: Date,
    required: true,
    default: () => {
      const now = new Date();
      return new Date(
        Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      );
    },
  },
  comment: { type: String, required: true },
  pictures: { type: String, required: true },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
