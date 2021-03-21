const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const moment = require('moment');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const mailController = require('../controllers/mailController');
const homeController = require('../controllers/homeController');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, homeController.loginPage);

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, homeController.mainDashboard);

router.get('/stats', ensureAuth, homeController.getStats);

router.post('/share/stats', ensureAuth, mailController.sendStats);

router.get('/share', ensureAuth, mailController.viewMailStats)

router.get('/wakatime', ensureAuth, async (req, res) => {
	res.render('wakatime/view')
})

router.get('/whatpulse', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('whatpulse/view', {
		name: user
	})
});

router.get('/date', async (req, res) => {
	let date = new Date()
	let formatted = moment(date).format("YYYY-MM-DD")

	res.send(formatted)
})

module.exports = router;
