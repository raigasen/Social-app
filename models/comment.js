const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	commentTitle: { type: String, required: true, max: 300 },
	hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	isReply: { type: Boolean, default: null },
	parentComment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null,
	},
	replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
