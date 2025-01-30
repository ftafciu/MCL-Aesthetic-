const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
  date: {
    type: Date,
    required: true,
  },
  comment: { type: String, required: false },
  type: { type: String, required: true },
  pictures: { type: [String], required: false },
  price: { type: Number, required: true },
});

sessionSchema.statics.getMonthlySessions = async function () {
  const now = new Date();
  const startOfCurrentMonth = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1)
  );
  const startOfNextMonth = new Date(
    Date.UTC(now.getFullYear(), now.getMonth() + 1, 1)
  );
  const startOfPreviousMonth = new Date(
    Date.UTC(now.getFullYear(), now.getMonth() - 1, 1)
  );
  const currentMonthSessions = await this.find({
    date: { $gte: startOfCurrentMonth, $lt: startOfNextMonth },
  }).exec();
  const previousMonthSessions = await this.find({
    date: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
  }).exec();
  return {
    currentMonth: currentMonthSessions,
    previousMonth: previousMonthSessions,
  };
};

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
