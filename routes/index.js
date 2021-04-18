const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const moment = require('moment');
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const mailController = require('../controllers/mailController');
const homeController = require('../controllers/homeController');
const jobsController = require('../controllers/jobsController');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, homeController.loginPage);

// @desc    Dashboard
// @route   GET /dashboard
router.get(
	'/dashboard',
	ensureAuth,
	homeController.mainDashboard
);

// @desc    Stats
// @route   GET /stats
router.get('/stats', ensureAuth, homeController.getStats);

// @desc    Email Stats
// @route   GET /share/stats
router.post('/share/stats', ensureAuth, mailController.sendStats);

// @desc    Mail View
// @route   GET /share
router.get('/share', ensureAuth, mailController.viewMailStats)

// @desc    Wakatime View
// @route   GET /wakatime
router.get('/wakatime', ensureAuth, async (req, res) => {
	res.render('wakatime/view')
})

// @desc    WhatPulse view
// @route   GET /whatpulse
router.get('/whatpulse', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('whatpulse/view', {
		name: user
	})
});

// @desc    WhatPulse view
// @route   GET /whatpulse
router.get('/gitter', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('whatpulse/view', {
		name: user
	})
});

// @desc    WhatPulse view
// @route   GET /whatpulse
router.get('/github', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('whatpulse/view', {
		name: user
	})
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/date', async (req, res) => {
	let date = new Date()
	let formatted = moment(date).format("YYYY-MM-DD")

	res.send(formatted)
})

module.exports = router;
