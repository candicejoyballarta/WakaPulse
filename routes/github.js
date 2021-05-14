const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const githubController = require('../controllers/githubController');

// @desc    GitHub View
// @route   GET /github
router.get('/', ensureAuth, githubController.githubView)



module.exports = router;