const express = require('express');
const { ImgurClient } = require('imgur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userData = require('../data/users');
const User = require('../models/user');
const Post = require('../models/post');
const { ObjectId } = require('mongodb');
const verifyToken = require('../utils/verifyToken');
const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const nodemailer = require('nodemailer');
const { ConnectionClosedEvent } = require('mongodb');
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

router.post('/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		if (!password || !email) {
			return res.status(400).send({
				error: 'Username and Password (both) have to be provided',
			});
		}

		const user = await User.findOne({ email });
		console.log('>>', { user });

		// verify confirmation
		if (!user.confirmed) {
			return res
				.status(404)
				.send({ error: 'Please confirm your email to login' });
		}

		if (!user) {
			return res
				.status(404)
				.send({ error: 'Username or Password is invalid' });
		}

		// check password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res
				.status(403)
				.send({ error: 'Username or Password is invalid' });
		}
		console.log('>>>', process.env.JWT_SECRET);
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24 * 365, // 1 year
		});

		res.cookie('token', token, {
			expiresIn: 60 * 60 * 24 * 365,
			secure: true,
		});

		return res.send({ user, token });
	} catch (err) {
		console.log({ err });
		return res
			.status(500)
			.send({ error: 'An unexpected error occurred', details: err });
	}
});

router.post('/register', async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	try {
		if (!email || !password || !firstName || !lastName) {
			return res.status(400).send({
				error: 'Email, Username, Password, First Name and Last Name (all) have to be provided',
			});
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(403).send({ error: 'This user already exists!' });
		}

		if (password.length < 5)
			return res
				.status(403)
				.send({ error: 'Password must be at least 5 characters' });

		if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
			return res
				.status(403)
				.send({ error: 'Please enter a valid email address' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});
		await newUser.save();

		console.log({
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		});

		const url = `http://localhost:3000/signup/confirmation/`;
		transporter.sendMail({
			to: email,
			subject: 'Confirm Email',
			html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
		});

		console.log('Email sent');

		return res.send({ user: newUser });
	} catch (err) {
		console.log('error >>', { err });
		return res
			.status(500)
			.send({ error: 'An unexpected error occurred', details: err });
	}
});

router.get('/profile/:userId', async (req, res) => {
	const userId = req.params.userId;

	if (!userId) {
		return res.status(400).send({ error: 'UserId must be provided!' });
	}

	try {
		if (ObjectId.isValid(userId)) {
			const user = await User.findById(userId);

			if (!user) {
				return res
					.status(404)
					.send({ error: 'No such user was found!' });
			}

			const posts = await Post.find({ user: user._id })
				.populate(['user', 'likes', 'comments'])
				.populate({
					path: 'comments',
					populate: { path: 'user', model: 'User' },
				})
				.sort({ created: -1 });

			return res.send({ user, posts });
		} else {
			return res
				.status(400)
				.send({ error: 'UserID is not a valid ObjectId' });
		}
	} catch (err) {
		return res
			.status(500)
			.send({ error: 'An unexpected error occurred', details: err });
	}
});

router.post(
	'/update-profile',
	verifyToken,
	upload.fields([{ name: 'avatar' }, { name: 'backdrop' }]),
	async (req, res) => {
		const avatar = req.files.avatar;
		const backdrop = req.files.backdrop;

		if (!avatar || !backdrop) {
			return res
				.status(400)
				.send({ error: 'Avatar/Backdrop image must be provided!' });
		}

		try {
			const user = await User.findOne({ _id: req.user });

			const client = new ImgurClient({
				clientId: process.env.CLIENT_ID,
			});

			if (avatar && !backdrop) {
				const response = await client.upload({
					image: avatar[0].buffer,
					name: `avatar_${user.firstName}_${
						user.lastName
					}_${Date.now()}`,
					type: 'stream',
				});

				const updateStatus = await User.updateOne(
					{ _id: req.user },
					{ avatar: response.data.link }
				);

				if (updateStatus.modifiedCount === 1) {
					return res.send({
						message: 'Avatar updated successfully!',
					});
				}
			} else if (!avatar && backdrop) {
				const response = await client.upload({
					image: backdrop[0].buffer,
					name: `backdrop_${user.firstName}_${
						user.lastName
					}_${Date.now()}`,
					type: 'stream',
				});

				const updateStatus = await User.updateOne(
					{ _id: req.user },
					{ backdrop: response.data.link }
				);

				if (updateStatus.modifiedCount === 1) {
					return res.send({
						message: 'Backdrop updated successfully!',
					});
				}
			} else {
				const avatarResponse = await client.upload({
					image: avatar[0].buffer,
					name: `avatar_${user.firstName}_${
						user.lastName
					}_${Date.now()}`,
					type: 'stream',
				});
				const backdropResponse = await client.upload({
					image: backdrop[0].buffer,
					name: `backdrop_${user.firstName}_${
						user.lastName
					}_${Date.now()}`,
					type: 'stream',
				});

				console.log(avatarResponse, backdropResponse);

				const updateStatus = await User.updateOne(
					{ _id: req.user },
					{
						avatar: avatarResponse.data.link,
						backdrop: backdropResponse.data.link,
					}
				);

				if (updateStatus.modifiedCount === 1) {
					return res.send({
						message: 'Profile updated successfully!',
					});
				}
			}
		} catch (err) {
			return res
				.status(500)
				.send({ error: 'An unexpected error occurred', details: err });
		}
	}
);

router.post('/logout', async (req, res) => {
	try {
		const token = req.header('Authorization');
		// jwt.destroy(token);
		res.clearCookie('token');
		res.status(200).json({ message: 'You have logged out' });
	} catch (error) {
		res.status(400).send({ error: error?.message ?? error }); //need to render
	}
});

module.exports = router;
