const Train = require('../models/train.model');
const Station = require('../models/station.model');

// Train management
const addTrain = async (req, res) => {
    try {
        const newTrain = new Train(req.body);
        await newTrain.save();
        res.status(201).json({ success: true, data: newTrain });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTrain = async (req, res) => {
    try {
        const updatedTrain = await Train.findOneAndUpdate({ trainId: req.params.trainId }, req.body, { new: true });
        if (!updatedTrain) return res.status(404).json({ success: false, message: 'Train not found' });
        res.json({ success: true, data: updatedTrain });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTrain = async (req, res) => {
    try {
        const deletedTrain = await Train.findOneAndDelete({ trainId: req.params.trainId });
        if (!deletedTrain) return res.status(404).json({ success: false, message: 'Train not found' });
        res.json({ success: true, message: 'Train deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Station management
const addStation = async (req, res) => {
    try {
        const newStation = new Station(req.body);
        await newStation.save();
        res.status(201).json({ success: true, data: newStation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateStation = async (req, res) => {
    try {
        const updatedStation = await Station.findOneAndUpdate({ stationId: req.params.stationId }, req.body, { new: true });
        if (!updatedStation) return res.status(404).json({ success: false, message: 'Station not found' });
        res.json({ success: true, data: updatedStation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteStation = async (req, res) => {
    try {
        const deletedStation = await Station.findOneAndDelete({ stationId: req.params.stationId });
        if (!deletedStation) return res.status(404).json({ success: false, message: 'Station not found' });
        res.json({ success: true, message: 'Station deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Analytics
const getTrafficAnalytics = async (req, res) => {
    try {
        const runningTrains = await Train.countDocuments({ currentStatus: 'running' });
        const delayedTrains = await Train.countDocuments({ currentStatus: 'delayed' });
        const completedJourneys = await Train.countDocuments({ currentStatus: 'completed' });

        // Per-zone congestion (dummy implementation)
        const congestion = await Station.aggregate([
            { $group: { _id: "$zone", stationCount: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                runningTrains,
                delayedTrains,
                completedJourneys,
                congestion
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addTrain,
    updateTrain,
    deleteTrain,
    addStation,
    updateStation,
    deleteStation,
    getTrafficAnalytics
};