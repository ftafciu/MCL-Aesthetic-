const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  firstSessionDate: {
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

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
