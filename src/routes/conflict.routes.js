const express = require('express');
const router = express.Router();
const conflictController = require('../controllers/conflict.controller');

// Get all conflicts
router.get('/', conflictController.getConflicts);

// Apply a suggestion/action to a conflict
router.post('/:conflictId/suggestion', conflictController.applySuggestion);

module.exports = router;
