const express = require('express');
const passport = require('passport');
const router = express.Router()

const goalsController = require('../controllers/goalsController');
const homeController = require('../controllers/homeController');
const { ensureAuth } = require('../middleware/auth');

// List of goals
router.get('/', ensureAuth, goalsController.indexGoal)

// Create View
router.get('/create', ensureAuth, goalsController.createGoal);

// Create
router.post('/', ensureAuth, goalsController.addGoal)

// Edit View
router.get('/edit/:id', ensureAuth, goalsController.editGoal)

// Update View
router.put('/:id', ensureAuth, goalsController.updateGoal)

//Delete
router.delete('/:id', ensureAuth, goalsController.deleteGoal);

// Goal details
router.get('/details/:id', ensureAuth, goalsController.detailGoalView)
router.get('/detail/:id', ensureAuth, homeController.detailGoal)


module.exports = router;