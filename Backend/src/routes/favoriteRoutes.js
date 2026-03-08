const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite, checkFavorite } = require('../controllers/favoriteController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.get('/check/:tmdbId', checkFavorite);
router.delete('/:tmdbId', removeFavorite);

module.exports = router;
