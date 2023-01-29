const userRoute = require('./users');
const commentRoute = require('./comments');
const postRoute = require('./post');

const constructorMethod = (app) => {
	app.use('/', userRoute);
	app.use('/comments', commentRoute);
	app.use('/posts', postRoute);
	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Resource Not found' });
	});
};
module.exports = constructorMethod;
