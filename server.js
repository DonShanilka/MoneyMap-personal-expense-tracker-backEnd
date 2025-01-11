
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const expensesRoutes = require('./routes/expensesRoutes');
app.use('/api', expensesRoutes);

const dashbordRoutes = require('./routes/dashbordRoutes')
app.use('/api', dashbordRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
