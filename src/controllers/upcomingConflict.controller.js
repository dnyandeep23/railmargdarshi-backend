const UpcomingConflict = require('../models/upcomingConflict.model');

// Get all upcoming conflicts
exports.getUpcomingConflicts = async (req, res) => {
    try {
        const conflicts = await UpcomingConflict.find();
        console.log(conflicts);
        console.log("Fetched upcoming conflicts");
        res.json(conflicts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming conflicts' });
    }
};

// Optionally: Add a new upcoming conflict
exports.addUpcomingConflict = async (req, res) => {
    try {
        const conflict = new UpcomingConflict(req.body);
        await conflict.save();
        res.status(201).json(conflict);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add upcoming conflict' });
    }
};
