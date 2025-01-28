const Expense = require("../models/expenses");
const Session = require("../models/session.js");
const sessionRepo = require("./session-repository.js");

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
    const sessions = sessionRepo.getFinishedSessions(startDate, endDate);
    const value = sessions.reduce((acc, session) => {
      return Number(acc) + Number(session.price.$numberDecimal);
    }, 0);
    return { result: true, data: { sessions, value } };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

module.exports = {
  getMonthlyExpenses,
  getMonthlySessions,
  getTimeRangeProfits,
};
