const express = require('express');
const router = express.Router();
const Train = require('../models/train.model');

// Get all trains
router.get('/', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch trains' });
    }
});

// Get train by ID
router.get('/:id', async (req, res) => {
    try {
        const train = await Train.findOne({ id: req.params.id });
        if (!train) return res.status(404).json({ error: 'Train not found' });
        res.json(train);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch train' });
    }
});

// Search trains
router.get('/search', async (req, res) => {
    const q = req.query.q || '';
    try {
        const trains = await Train.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { id: { $regex: q, $options: 'i' } },
                { route: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(trains);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search trains' });
    }
});

module.exports = router;
