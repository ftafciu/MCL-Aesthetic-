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

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
