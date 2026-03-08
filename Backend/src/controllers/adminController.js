const Movie = require('../models/Movie');
const User = require('../models/User');

// ===== MOVIE CRUD =====

// @desc    Admin add movie
// @route   POST /api/admin/movies
const addMovie = async (req, res) => {
  try {
    const { title, posterUrl, description, tmdbId, releaseDate, trailerUrl, genre, category, rating } = req.body;

    const movie = await Movie.create({
      title,
      posterUrl,
      description,
      tmdbId,
      releaseDate,
      trailerUrl,
      genre,
      category,
      rating,
      addedBy: req.user._id
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin update movie
// @route   PUT /api/admin/movies/:id
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin delete movie
// @route   DELETE /api/admin/movies/:id
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== USER MANAGEMENT =====

// @desc    Get all users
// @route   GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Ban user
// @route   PUT /api/admin/users/:id/ban
const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot ban admin users' });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin users' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMovie, updateMovie, deleteMovie, getUsers, banUser, deleteUser };
