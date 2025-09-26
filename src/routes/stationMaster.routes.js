const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role.middleware');
const {
    getStationTraffic,
    updateSignalForTrain,
    getConflictResolution
} = require('../controllers/stationMaster.controller');

const stationMasterOnly = checkRole(['station_master']);

router.post('/traffic/:stationId', stationMasterOnly, getStationTraffic);
router.post('/signal/update', stationMasterOnly, updateSignalForTrain);
router.post('/conflict/resolve', stationMasterOnly, getConflictResolution);

module.exports = router;