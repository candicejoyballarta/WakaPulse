const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Github Jobs view
// @route   GET /githubjobs
router.get('/', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('githubjobs/view', {
		name: user,
        layout: 'jobs'
	})
});

// @desc    Github Jobs view
// @route   GET /githubjobs
router.get('/index', ensureAuth, async (req, res) => {
	res.render('githubjobs/index', {
		name: user,
        layout: 'jobs'
	})
});

// @desc    Github Jobs search
// @route   POST /githubjobs/search
router.post('/search', ensureAuth, async (req, res) => {
    try {
		const desc = req.body.search;
		console.log(desc);

		const job_fetch = await fetch(
			`https://jobs.github.com/positions.json?description=${desc}`
		)
			.then((result) => result.json())
			.then((data) => {
				const jobs = data

				res.render('githubjobs/view', {
					layout: 'jobs',
					jobs,
					desc
				});
			})
			.catch((err) => {
				console.error(err)
			});
		// const resp = job_fetch.json();
        
        
	} catch (err) {
        console.error(err);
    }
});



module.exports = router;