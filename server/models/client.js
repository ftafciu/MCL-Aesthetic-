const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: {
    type: String, required: true, validate: {
      validator: function (value) {
        const regex = /^\+3556[789]\d{7}$/;
        return regex.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    }, unique: true
  },
  age: { type: Number, required: true },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
