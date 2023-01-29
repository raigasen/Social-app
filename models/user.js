const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true, max: 255 },
	lastName: { type: String, required: true, max: 255 },
	email: { type: String, required: true, max: 255 },
	// username: { type: String, required: true, max: 255 },
	avatar: { type: String, default: null },
	backdrop: { type: String, default: null },
	bio: { type: String, max: 100, default: null },
	password: { type: String, required: true, max: 1024 },
	confirmed: { type: Boolean, default: true },
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
