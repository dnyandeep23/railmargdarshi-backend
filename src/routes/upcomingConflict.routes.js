const express = require('express');
const router = express.Router();
const upcomingConflictController = require('../controllers/upcomingConflict.controller');

// Get all upcoming conflicts
router.get('/', upcomingConflictController.getUpcomingConflicts);

// Add a new upcoming conflict
router.post('/', upcomingConflictController.addUpcomingConflict);

module.exports = router;
