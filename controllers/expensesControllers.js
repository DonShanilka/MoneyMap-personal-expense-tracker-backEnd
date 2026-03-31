const db = require('../config/db');

exports.saveData = async (req, res) => {
    const { category, price, date, itemname, userEmail } = req.body;

    if (!userEmail) {
        return res.status(400).json({ error: 'User not authenticated' });
    }

    const insertExpenseQuery = 'INSERT INTO expenses (category, price, date, itemname,  userEmail) VALUES (?, ?, ?, ?, ?)';

    db.query(insertExpenseQuery, [category, price, date, itemname, userEmail], (err, result) => {
        if (err) {
            console.error('Error inserting expense:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
    });
};


exports.getExpensesByUser = (req, res) => {
    const { userEmail } = req.params; 

    const query = 'SELECT * FROM expenses WHERE userEmail = ?';

    db.query(query, [userEmail], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};


exports.deleteExpense = (req, res) => {
    const expenseId = req.params.id;
    const query = 'DELETE FROM expenses WHERE id = ?';

    db.query(query, [expenseId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
};


exports.updateExpense = (req, res) => {
    const { id, category, price, date, itemname } = req.body;

    if (!id || !category || !price || !date || !itemname) {
        return res.status(400).json({ error: 'ID, category, price, and date are required' });
    }

    const updateExpenseQuery = 'UPDATE expenses SET category = ?, price = ?, date = ?,  itemname = ? WHERE id = ?';

    db.query(updateExpenseQuery, [category, price, date, itemname, id], (err, result) => {
        if (err) {
            console.error('Error updating expense:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully' });
    });
};


