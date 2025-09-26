require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use('/api/station-master', require('./src/routes/stationMaster.routes'));
app.use('/api/signal-controller', require('./src/routes/signalController.routes'));

app.get('/', (req, res) => {
    res.send('RailMargdarshi API is running...');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));