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
	frequency: {
		type: String,
		default: 'daily',
		enum: ['daily', 'weekly'],
	},
	streak: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
});

GoalSchema.set('timestamps', true)

module.exports = mongoose.model('Goal', GoalSchema);
