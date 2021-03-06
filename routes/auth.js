const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with WakaTime
// @route   GET /auth/wakatime
router.get(
	'/wakatime',
	passport.authenticate('oauth2', { scope: ['email,read_stats'] })
);

// @desc    Wakatime auth callback
// @route   GET /auth/wakatime/callback
router.get(
	'/wakatime/callback',
	passport.authenticate('oauth2', {
		scope: ['email,read_stats'],
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
