const Favorite = require('../models/Favorite');

// @desc    Get user favorites
// @route   GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to favorites
// @route   POST /api/favorites
const addFavorite = async (req, res) => {
  try {
    const { tmdbId, title, posterPath, mediaType, rating, releaseDate } = req.body;

    const exists = await Favorite.findOne({ user: req.user._id, tmdbId });
    if (exists) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      tmdbId,
      title,
      posterPath,
      mediaType,
      rating,
      releaseDate
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/favorites/:tmdbId
const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      tmdbId: req.params.tmdbId
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if movie is in favorites
// @route   GET /api/favorites/check/:tmdbId
const checkFavorite = async (req, res) => {
  try {
    const exists = await Favorite.findOne({
      user: req.user._id,
      tmdbId: req.params.tmdbId
    });
    res.json({ isFavorite: !!exists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite, checkFavorite };
