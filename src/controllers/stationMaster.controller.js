const Train = require('../models/train.model');
const Station = require('../models/station.model');
const { resolveConflict } = require('../services/aiConflict.service');

const getStationTraffic = async (req, res) => {
    try {
        const { stationId } = req.params;
        // Dummy data for traffic
        const traffic = {
            upcoming: await Train.find({ "route.stationId": stationId }).limit(2),
            halted: await Train.find({ "route.stationId": stationId, currentStatus: 'at_station' }).limit(2),
            departed: await Train.find({ "route.stationId": stationId }).limit(2)
        };
        res.json({ success: true, data: traffic });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSignalForTrain = async (req, res) => {
    try {
        const { stationId, trainId, signalStatus } = req.body;
        const station = await Station.findOneAndUpdate({ stationId }, { "signal.status": signalStatus }, { new: true });
        if (!station) return res.status(404).json({ success: false, message: 'Station not found' });

        const train = await Train.findOne({ trainId });
        if (!train) return res.status(404).json({ success: false, message: 'Train not found' });

        train.signalHistory.push({ stationId, signalStatus });
        await train.save();

        res.json({ success: true, data: { station, train } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getConflictResolution = (req, res) => {
    try {
        const suggestions = resolveConflict(req.body);
        res.json({ success: true, data: suggestions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getStationTraffic,
    updateSignalForTrain,
    getConflictResolution
};