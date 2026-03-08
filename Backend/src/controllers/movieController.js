const Movie = require('../models/Movie');

// @desc    Get all movies (admin-added)
// @route   GET /api/movies
const getMovies = async (req, res) => {
  try {
    const { category, genre, page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (category) filter.category = category;
    if (genre) filter.genre = { $in: [genre] };

    const movies = await Movie.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(filter);

    res.json({
      movies,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovie };
