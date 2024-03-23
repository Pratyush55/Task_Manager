const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Signup route
router.post('/', authController.signup);

module.exports = router;