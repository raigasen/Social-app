const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
	name: { type: String, required: true },
	points: { type: Number, required: true },
	awarded_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	awarded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Award', awardSchema);
