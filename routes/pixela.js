const express = require('express');
const passport = require('passport');
const router = express.Router();

const { ensureAuth, ensureGuest } = require('../middleware/auth');
const pixelaController = require('../controllers/pixelaController');

// @desc    Pixela view
// @route   GET /pixela
router.get('/', ensureAuth, pixelaController.indexPixela);

// @desc    Pixela view
// @route   GET /pixela/index
router.get('/index', ensureAuth, async (req, res) => {
	const user = req.user.userName
	res.render('pixela/index', {
		layout: 'pixela',
		name: user,
	});
});

// @desc    Pixela create user
// @route   GET /pixela/user
router.get('/user', ensureAuth, pixelaController.createPixelaUser);

// @desc    Pixela create graph
// @route   POST /pixela/graph
router.post('/graph', ensureAuth, pixelaController.createGraph);

// @desc    Pixela create view
// @route   GET /pixela/graph/create
router.get('/graph/create', ensureAuth, pixelaController.createGraphView);

// @desc    Pixela create graph
// @route   GET /pixela/graphs
router.get('/graph', ensureAuth, pixelaController.getGraph);

// @desc    Pixela view graph
// @route   POST /pixela/graphs/details
router.post('/graphs/details', ensureAuth, pixelaController.getGraphSVG);

// @desc    Post a pixel
// @route   POST /pixela/pixel
router.post('/pixel', ensureAuth, pixelaController.createPixel);

module.exports = router;