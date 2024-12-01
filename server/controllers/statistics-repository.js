const Expense = require('../models/expenses');
const Session = require('../models/session.js');

const getMonthlyExpenses = async () => {
    try {
        const expenses = await Expense.getMonthlyExpenses();
        return { result: true, expenses }
    } catch(error) {
        return { result: false, message: error.message };
    }
}

const getMonthlySessions = async () => {
    try {
        const sessions = await Session.getMonthlySessions();
        return { result: true, sessions }
    } catch(error) {
        return { result: false, message: error.message };
    }
}

module.exports = {
    getMonthlyExpenses,
    getMonthlySessions
}