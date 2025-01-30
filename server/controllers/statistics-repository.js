const Expense = require("../models/expenses");
const Session = require("../models/session.js");
const sessionRepo = require("./session-repository.js");
const expensesRepo = require("./expensesController.js");

const getMonthlyExpenses = async () => {
  try {
    const expenses = await Expense.getMonthlyExpenses();
    return { result: true, expenses };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const getMonthlySessions = async () => {
  try {
    const sessions = await Session.getMonthlySessions();
    return { result: true, sessions };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const getTimeRangeProfits = async (startDate, endDate) => {
  try {
    const sessions = await sessionRepo.getFinishedSessions(startDate, endDate);
    const value = sessions.sessions.reduce((acc, session) => {
      return Number(acc) + Number(session.price);
    }, 0);
    console.log(sessions);
    return { result: true, data: { sessions: sessions.sessions, value } };
  } catch (error) {
    console.log(error);
    return { result: false, message: error.message };
  }
};

const getTimeRangeExpenses = async (startDate, endDate) => {
  try {
    const expenses = await expensesRepo.expensesByTimeRange(startDate, endDate);
    const value = expenses.expenses.reduce((acc, expense) => {
      return Number(acc) + Number(expense.quantity);
    }, 0);
    console.log(expenses);
    return { result: true, data: { expenses: expenses.expenses, value } };
  } catch (error) {
    console.log(error);
    return { result: false, message: error.message };
  }
};

module.exports = {
  getMonthlyExpenses,
  getMonthlySessions,
  getTimeRangeProfits,
  getTimeRangeExpenses,
};
