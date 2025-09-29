const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    action: String,
    benefit: String,
    risk: String,
    appliedBy: String,
    appliedAt: { type: Date, default: Date.now }
}, { _id: false });

const conflictSchema = new mongoose.Schema({
    trainIds: [String],
    location: String,
    type: String,
    severity: String,
    estimatedDelay: Number,
    suggestions: [suggestionSchema],
    resolved: { type: Boolean, default: false },
    resolvedAt: Date
});

module.exports = mongoose.model('Conflict', conflictSchema);
