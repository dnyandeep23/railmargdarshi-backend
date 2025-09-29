require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const serverless = require('serverless-http'); // ✅ For Vercel

// ✅ Connect to DB only once
connectDB();

const app = express();

// ✅ CORS Configuration for all origins
const allowedOrigins = [
    'https://railmargdarshi-frontend.vercel.app',
    'http://localhost:5173', // local dev
];

app.use(
    cors({
        origin: true, // reflects request origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// ✅ Explicitly handle preflight
app.options('*', cors());
// ✅ Express body parser
app.use(express.json());

// ⚠️ Remove express-session for serverless (not persistent)
// If you need sessions, use JWT or a DB-backed session store

// ✅ Routes
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use('/api/station-master', require('./src/routes/stationMaster.routes'));
app.use('/api/signal-controller', require('./src/routes/signalController.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/trains', require('./src/routes/train.routes'));
app.use('/api/conflicts', require('./src/routes/conflict.routes'));
app.use('/api/upcoming-conflicts', require('./src/routes/upcomingConflict.routes'));

// ✅ Health check route
app.get('/', (req, res) => {
    res.json({ message: 'RailMargdarshi API is running...' });
});

// ✅ Local Development (run only locally)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () =>
        console.log(`🚀 Server running locally on http://localhost:${PORT}`)
    );
}

// ✅ Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
