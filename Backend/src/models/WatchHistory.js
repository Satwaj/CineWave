const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tmdbId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  posterPath: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  rating: {
    type: Number,
    default: 0
  },
  watchedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

watchHistorySchema.index({ user: 1, tmdbId: 1 });

module.exports = mongoose.model('WatchHistory', watchHistorySchema);
