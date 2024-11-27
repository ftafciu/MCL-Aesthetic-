const mongoose = require("mongoose");
const faceSession = require("./face-session");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
  session: { type: Schema.Types.ObjectId, required: false, ref: "Session" },
  faceSession: { type: Schema.Types.ObjectId, required: false, ref: "FaceSession" },
  bodySession: { type: Schema.Types.ObjectId, required: false, ref: "BodySession" },
  nextSessionDate: {
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
  status: {
    type: String,
    enum: ['cleared', 'uncleared'],
    required: true,
    default: 'uncleared'
  }
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
