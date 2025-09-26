const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role.middleware');
const {
    getSignalStatus,
    updateSignalStatus,
    getSignalHistory
} = require('../controllers/signalController.controller');

const signalControllerOnly = checkRole(['signal_controller']);
const stationAccess = checkRole(['signal_controller', 'station_master']);

router.post('/status/:stationId', signalControllerOnly, getSignalStatus);
router.post('/update', stationAccess, updateSignalStatus);
router.post('/history/:trainId', signalControllerOnly, getSignalHistory);

module.exports = router;