const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	goalType: {
		type: String,
		default: 'coding',
		required: true,
	},
	frequency: {
		type: String,
		required: true,
	},
	date: {
		type: String,
	},
	time: {
		type: String,
		required: true,
	},
	streak: {
		type: Number,
		default: 0,
	},
	days: {
		one: {
			type: String,
			default: null,
		},
		two: {
			type: String,
			default: null,
		},
		three: {
			type: String,
			default: null,
		},
		four: {
			type: String,
			default: null,
		},
		five: {
			type: String,
			default: null,
		},
		six: {
			type: String,
			default: null,
		},
		seven: {
			type: String,
			default: null,
		},
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Goal', GoalSchema);
