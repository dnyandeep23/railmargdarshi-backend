const Station = require('../models/station.model');
const Train = require('../models/train.model');

const getSignalStatus = async (req, res) => {
    try {
        const station = await Station.findOne({ stationId: req.params.stationId });
        if (!station) return res.status(404).json({ success: false, message: 'Station not found' });
        res.json({ success: true, data: station.signal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSignalStatus = async (req, res) => {
    try {
        const { stationId, status } = req.body;
        const updatedStation = await Station.findOneAndUpdate({ stationId }, { "signal.status": status }, { new: true });
        if (!updatedStation) return res.status(404).json({ success: false, message: 'Station not found' });
        res.json({ success: true, data: updatedStation.signal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSignalHistory = async (req, res) => {
    try {
        const train = await Train.findOne({ trainId: req.params.trainId });
        if (!train) return res.status(404).json({ success: false, message: 'Train not found' });
        res.json({ success: true, data: train.signalHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSignalStatus,
    updateSignalStatus,
    getSignalHistory
};