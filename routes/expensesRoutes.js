const express = require('express');
const router = express.Router();
const expensesControllers = require('../controllers/expensesControllers');

router.post('/saveData', expensesControllers.saveData);
router.get('/getExpensesByUser/:userEmail', expensesControllers.getExpensesByUser);
router.delete('/deleteExpenses/:id', expensesControllers.deleteExpense);
router.put('/updateExpenses', expensesControllers.updateExpense);

module.exports = router;
