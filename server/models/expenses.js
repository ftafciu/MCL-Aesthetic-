const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Decimal128 } = require("mongodb");

const expensesSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Decimal128, required: true },
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
  },
  { timestamps: true }
);

expensesSchema.statics.getMonthlyExpenses = async function () {
  const now = new Date();
  const startOfCurrentMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  const startOfNextMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));
  const startOfPreviousMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 1, 1));
  const currentMonthExpenses = await this.find({
    date: { $gte: startOfCurrentMonth, $lt: startOfNextMonth },
  }).exec();
  const previousMonthExpenses = await this.find({
    date: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth },
  }).exec();
  return {
    currentMonth: currentMonthExpenses,
    previousMonth: previousMonthExpenses,
  };
};

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
