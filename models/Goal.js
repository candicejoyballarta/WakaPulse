const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	goalType: {
		type: String,
		default: 'coding',
		required: true,
	},
	unit: {
		type: String,
		default: 'commit',
		required: true,
	},
	graphId: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

GoalSchema.set('timestamps', true)

module.exports = mongoose.model('Goal', GoalSchema);
