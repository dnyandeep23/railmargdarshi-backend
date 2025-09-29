const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    station: String,
    arrival: String,
    departure: String,
    status: String
}, { _id: false });

const trainSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    route: String,
    currentStation: String,
    nextStation: String,
    status: String,
    delay: Number,
    speed: Number,
    zone: String,
    schedule: [scheduleSchema]
});

module.exports = mongoose.model('Train', trainSchema);