const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    route: [{
        stationId: { type: String, ref: 'Station' },
        scheduledArrival: { type: String },
        scheduledDeparture: { type: String },
    }],
    currentStatus: { type: String, enum: ['running', 'delayed', 'completed', 'cancelled'], default: 'running' },
    signalHistory: [{
        stationId: { type: String },
        signalStatus: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);