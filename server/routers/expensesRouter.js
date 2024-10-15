const express = require("express");
const router = express();
const expensesController = require("../controllers/expensesController");
const login_controller = require("../controllers/userProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", expensesController.createExpenses);

router.get("/getById/:expenseId", expensesController.getAllExpenses);

router.get("/getAll", expensesController.getAllExpenses);

router.post("/getByName", expensesController.getExpenseByName);

router.post("/getByTimeRange", expensesController.getExpensesByTimeRange);

router.put("/updateExpense", expensesController.updateExpenses);

router.delete("/deleteExpense", expensesController.deleteExpense);

module.exports = router;
