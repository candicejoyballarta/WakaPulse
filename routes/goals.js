const express = require('express');
const router = express.Router()

const goalsController = require('../controllers/goalsController');
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
router.get('/details/:id', ensureAuth, goalsController.detailGoal)


module.exports = router;