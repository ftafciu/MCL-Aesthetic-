const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
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
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
