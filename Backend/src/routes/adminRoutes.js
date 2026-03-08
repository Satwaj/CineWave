const express = require('express');
const router = express.Router();
const { addMovie, updateMovie, deleteMovie, getUsers, banUser, deleteUser } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

router.use(protect, adminOnly);

// Movie CRUD
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// User management
router.get('/users', getUsers);
router.put('/users/:id/ban', banUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
