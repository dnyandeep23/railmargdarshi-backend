const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role.middleware');
const {
    addTrain,
    updateTrain,
    deleteTrain,
    addStation,
    updateStation,
    deleteStation,
    getTrafficAnalytics
} = require('../controllers/admin.controller');

const adminOnly = checkRole(['admin']);

router.post('/trains', adminOnly, addTrain);
router.put('/trains/:trainId', adminOnly, updateTrain);
router.delete('/trains/:trainId', adminOnly, deleteTrain);

router.post('/stations', adminOnly, addStation);
router.put('/stations/:stationId', adminOnly, updateStation);
router.delete('/stations/:stationId', adminOnly, deleteStation);

router.post('/analytics', adminOnly, getTrafficAnalytics);

module.exports = router;