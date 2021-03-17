const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const moment = require('moment');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const mailController = require('../controllers/mailController');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
	res.render('login', {
		layout: 'login',
	});
});

// @desc    Dashboard
// @route   GET /
router.get('/dashboard', ensureAuth, async (req, res) => {

	try {

		const user = req.user.userName;

		res.render('dashboard', {
			name: req.user.userName,
			//data
		});

	} catch (err) {
		console.error(err);
		res.render('error/505')
	}
	
});

router.get('/stats', ensureAuth, async (req, res) => {
	const user = req.user.userName;
	//console.log(user);
	const fetch_res = await fetch(
		`https://wakatime.com/api/v1/users/${user}/stats/last_7_days`
	);
	const json = await fetch_res.json();

	const pulse_res = await fetch(
		`http://api.whatpulse.org/user.php?user=${user}&format=json`
	)
	.catch(function () {
		console.log("error on whatPulse");
	})
	const pulse_json = await pulse_res.json();

	const data = {
		languages: json.data.languages,
		operating_systems: json.data.operating_systems,
		editors: json.data.editors,
		daily: json.data.human_readable_daily_average,
		total: json.data.human_readable_total_including_other_language,
		mouse_clicks: pulse_json.Clicks,
		keys_typed: pulse_json.Keys,
	};

	//console.log(json);
	res.json(data)

});

router.post('/send/stats', ensureAuth, mailController.sendStats);


module.exports = router;
