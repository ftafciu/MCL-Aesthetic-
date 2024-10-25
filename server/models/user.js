const mongoose = require("mongoose");
const { Schema } = mongoose;
const { passwordHasher } = require("../utils/security-ground");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  gmail: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  role: {
    type: String,
    enum: ["admin", "client"],
    required: true,
    default: "client",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  user.password = passwordHasher(user.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
