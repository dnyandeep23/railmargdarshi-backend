require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use('/api/station-master', require('./src/routes/stationMaster.routes'));
app.use('/api/signal-controller', require('./src/routes/signalController.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/trains', require('./src/routes/train.routes'));

app.use('/api/conflicts', require('./src/routes/conflict.routes'));
app.use('/api/upcoming-conflicts', require('./src/routes/upcomingConflict.routes'));

app.get('/', (req, res) => {
    res.send('RailMargdarshi API is running...');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));