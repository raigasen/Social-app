const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).send({ error: 'Please sign in to continue' });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified.id;

		next();
	} catch (err) {
		return res.status(403).send({ error: 'Unauthorized!' });
	}
};
