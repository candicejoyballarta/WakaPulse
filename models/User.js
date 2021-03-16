const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	wakatimeId: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	photo: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
