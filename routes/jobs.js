const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const jobsController = require('../controllers/jobsController');

// @desc    Jobs View
// @route   GET /jobs
router.get('/', ensureAuth, jobsController.jobsView)

// @desc    Jobs Search
// @route   GET /jobs/search
router.post('/search', ensureAuth, jobsController.getJobs)

module.exports = router;