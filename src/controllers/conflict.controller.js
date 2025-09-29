const Conflict = require('../models/conflict.model');
const Train = require('../models/train.model');

// Get all conflicts (optionally analyze trains for overlapping times)
exports.getConflicts = async (req, res) => {
    try {
        // For demo: just return all conflicts
        const conflicts = await Conflict.find();
        res.json(conflicts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch conflicts' });
    }
};

// Store a suggestion/action for a conflict
exports.applySuggestion = async (req, res) => {
    const { conflictId } = req.params;
    const { action, benefit, risk, appliedBy } = req.body;
    try {
        const conflict = await Conflict.findById(conflictId);
        if (!conflict) return res.status(404).json({ error: 'Conflict not found' });

        // Keep only the selected suggestion, remove others, and mark as resolved
        conflict.suggestions = [{ action, benefit, risk, appliedBy, appliedAt: new Date() }];
        conflict.resolved = true;
        conflict.resolvedAt = new Date();
        await conflict.save();
        res.json(conflict);
    } catch (err) {
        res.status(500).json({ error: 'Failed to apply suggestion' });
    }
};
