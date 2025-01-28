const exp = require("constants");
const Expenses = require("../models/expenses");

const createExpenses = async (req, res) => {
  try {
    const { name, quantity, date } = req.body;
    const newExpense = new Expenses({
      name: name,
      quantity: quantity,
      date: date,
    });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: "Failed to create expenses" });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const expense = await Expenses.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getExpenseByName = async (req, res) => {
  try {
    const { name } = req.body;
    const expense = await Expenses.find({ name: name });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getExpensesByTimeRange = async (req, res) => {
  try {
    const { firstDate, lastDate } = req.body;
    const expenses = await Expenses.find({
      date: { $gte: new Date(firstDate), $lte: new Date(lastDate) },
    });
    if (!expenses) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const expensesByTimeRange = async (startDate, endDate) => {
  try {
    const expenses = await Expenses.find({
      date: { $gte: new Date(firstDate), $lte: new Date(lastDate) },
    });
    return { result: true, expenses };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const updateExpenses = async (req, res) => {
  try {
    const { id, newInfo } = req.body;
    const updatedExpense = await Expenses.findByIdAndUpdate(id, {
      ...newInfo,
    });
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expsenseId = req.params.expenseId;
    const deletedExpense = await Expenses.findByIdAndDelete(expsenseId);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createExpenses,
  getAllExpenses,
  getExpenseById,
  getExpenseByName,
  expensesByTimeRange,
  getExpensesByTimeRange,
  updateExpenses,
  deleteExpense,
};
