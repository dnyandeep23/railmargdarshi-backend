const mongoose = require('mongoose');

const upcomingConflictSchema = new mongoose.Schema({
    trainIds: [String],
    location: String,
    type: String,
    severity: String,
    estimatedDelay: Number,
    suggestions: [
        {
            action: String,
            benefit: String,
            risk: String
        }
    ],
    resolved: { type: Boolean, default: false },
    expectedAt: Date
});
module.exports = mongoose.model('UpcomingConflict', upcomingConflictSchema, 'upcomingconflicts');