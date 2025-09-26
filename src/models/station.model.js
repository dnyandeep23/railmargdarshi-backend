const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    stationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    zone: { type: String, required: true },
    isJunction: { type: Boolean, default: false },
    location: {
        lat: { type: Number },
        long: { type: Number }
    },
    signal: {
        status: { type: String, enum: ['green', 'yellow', 'red'], default: 'red' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);