const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const userData = require('../data/users');
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'kanishk.sharma2408@gmail.com',
		pass: '9414416191',
	},
});

// router.get('/', async (req, res) => {
//     try {
//         res.render('signup');
//     }
//     catch (e)
//     {
//         res.status(500).send();
//     }
// });

// new get to confirm email

router.post('/', async (req, res) => {
	try {
		username = req.body.username;
		email = req.body.email;
		password = req.body.password;

		const record = {
			username: username,
			email_id: email,
			password: password,
		};
		var result = await userData.addUser(record);

		if (result.flag == false) {
			if (result.type == 'exist') {
				res.status(200).json({
					flag: false,
					msg: 'Email exist already',
				});
			} else {
				res.status(200).json({
					flag: false,
					msg: 'Addition of new User is failure.',
				});
			}
		} else {
			// async confirm email

			jwt.sign(
				{
					user: _.pick(user, 'id'),
				},
				EMAIL_SECRET,
				{
					expiresIn: '1d',
				},
				(err, emailToken) => {
					const url = `http://localhost:3000/signup/confirmation/${emailToken}`;

					transporter.sendMail({
						to: args.email,
						subject: 'Confirm Email',
						html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
					});
				}
			);

			res.status(200).json({ flag: true });
		}
	} catch (e) {
		let error = e.toString();
		res.status(404).json({ flag: false, msg: error });
	}
});

router.get('/confirmation/:token', async (req, res) => {
	try {
		const {
			user: { id },
		} = jwt.verify(req.params.token, EMAIL_SECRET);
		await userData.update({ confirmed: true }, { where: { id } });
	} catch (e) {
		res.send('error');
	}

	return res.redirect('http://localhost:3001/login');
});

module.exports = router;
