const express = require('express');
const router = express.Router();
const dashbordController = require('../controllers/dashbordController')

router.get('/getLast7DaysData/:userEmail', dashbordController.getlast7day);
router.get('/getCategorySum/:userEmail', dashbordController.getCatagorySum);
router.get('/expense-summary/:userEmail', dashbordController.getExpensesTotal)
router.get('/getCatogoryTotal/:userEmail', dashbordController.getCatogoryTotal)

module.exports = router;