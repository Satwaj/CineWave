const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  posterUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'Description not available'
  },
  tmdbId: {
    type: String,
    default: ''
  },
  releaseDate: {
    type: String,
    default: ''
  },
  trailerUrl: {
    type: String,
    default: ''
  },
  genre: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['movie', 'tvshow'],
    default: 'movie'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
