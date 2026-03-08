const express = require('express');
const router = express.Router();
const { getWatchHistory, addToHistory, clearHistory } = require('../controllers/watchHistoryController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getWatchHistory);
router.post('/', addToHistory);
router.delete('/', clearHistory);

module.exports = router;
