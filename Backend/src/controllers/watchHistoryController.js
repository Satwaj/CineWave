const WatchHistory = require('../models/WatchHistory');

// @desc    Get user watch history
// @route   GET /api/watch-history
const getWatchHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ user: req.user._id })
      .sort({ watchedAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to watch history
// @route   POST /api/watch-history
const addToHistory = async (req, res) => {
  try {
    const { tmdbId, title, posterPath, mediaType, rating } = req.body;

    // Update if exists, create if not (upsert)
    const entry = await WatchHistory.findOneAndUpdate(
      { user: req.user._id, tmdbId },
      {
        user: req.user._id,
        tmdbId,
        title,
        posterPath,
        mediaType,
        rating,
        watchedAt: Date.now()
      },
      { upsert: true, new: true }
    );

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear watch history
// @route   DELETE /api/watch-history
const clearHistory = async (req, res) => {
  try {
    await WatchHistory.deleteMany({ user: req.user._id });
    res.json({ message: 'Watch history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWatchHistory, addToHistory, clearHistory };
