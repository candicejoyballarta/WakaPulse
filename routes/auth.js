const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with WakaTime
// @route   GET /auth/wakatime
router.get(
	'/wakatime',
	passport.authenticate('oauth2', {
		scope: [
			'email,read_logged_time,write_logged_time,read_stats,read_orgs,read_private_leaderboards,write_private_leaderboards',
		],
	})
);

// @desc    Wakatime auth callback
// @route   GET /auth/wakatime/callback
router.get(
	'/wakatime/callback',
	passport.authenticate('oauth2', {
		scope: [
			'email,read_logged_time,write_logged_time,read_stats,read_orgs,read_private_leaderboards,write_private_leaderboards',
		],
		failureRedirect: '/',
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/dashboard');
	}
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router;
