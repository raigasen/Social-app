import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/material/Stack';
import Divider from '@mui/joy/Divider';
import Navbar from './Navbar';
import { Posts } from './Posts';

import {
	CircularProgress,
	FormControl,
	Grid,
	TextareaAutosize,
	TextField,
} from '@mui/material';

import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const { userId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:4000/profile/${userId}`).then((res) => {
			setUser(res.data.user);
			setPosts(res.data.posts);

			setText(res.data.user.bio || '');

			setIsLoading(false);
		});
	}, []);
	let [text, setText] = useState('');

	if (isLoading) {
		return (
			<Box>
				<Navbar />
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box>
			<Navbar></Navbar>
			<Stack
				direction='row'
				spacing={1}
				alignItems='flex-start'
				justifyContent='center'
				padding={2}>
				<Stack
					direction='column'
					alignItems='center'
					justifyContent='center'
					width={'10%%'}
					padding={2}>
					<Box
						borderWidth='1px'
						borderRadius='lg'
						px={4}
						py={3}
						boxShadow={'md'}>
						<Box
							borderWidth='1px'
							borderRadius='lg'
							component='img'
							sx={{
								height: 150,
								width: 250,
								objectFit: 'cover',
							}}
							alt='backdrop'
							src={
								user.backdrop ||
								'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
							}
						/>
						<Stack alignItems='center' justify='center' mt={-10}>
							<Avatar
								src={user.avatar}
								sx={{ width: 120, height: 120 }}
								alt={'Author'}
							/>
							<Stack
								alignItems='center'
								justify='center'
								spacing={1}
								divider={
									<Divider
										orientation='horizontal'
										flexItem
									/>
								}>
								<Typography level='h2' component='strong'>
									{user.firstName} {user.lastName}
								</Typography>
								<Box>Frontend Developer</Box>
								<Button
									color='primary'
									size='sm'
									variant='soft'>
									Follow
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
				<Stack padding={1} sx={{ width: '50%' }}>
					<Box
						borderWidth='1px'
						borderRadius='lg'
						boxShadow={'md'}
						sx={{ p: 2 }}
						px={4}
						alignItems='center'>
						<TextareaAutosize
							minRows={6}
							style={{ width: 700 }}
							id='text-edit'
							value={text}
							placeholder='Tell me about Yourself'
							onChange={(event) =>
								setText(event.target.value)
							}></TextareaAutosize>
					</Box>
					<Box sx={{ width: '100%' }} py={2}>
						<Posts posts={posts} />
					</Box>
				</Stack>

				<Stack
					direction='column'
					padding={1}
					alignItems='center'
					justify='center'
					spacing={3}>
					<Box
						borderWidth='1px'
						borderRadius='lg'
						px={4}
						py={2}
						boxShadow={'md'}>
						<Typography level='h2' component='strong'>
							Karma : 2,199
						</Typography>
					</Box>
					<Divider orientation='horizontal' flexItem />
					<Box
						borderWidth='1px'
						borderRadius='lg'
						px={4}
						py={2}
						boxShadow={'md'}>
						<Stack
							direction='column'
							padding={1}
							alignItems='center'
							justify='center'
							spacing={1}>
							<Typography level='h4' component='strong'>
								Rewards
							</Typography>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<Box
										borderWidth='1px'
										borderRadius='lg'
										px={2}
										py={2}
										boxShadow={'md'}>
										<AcUnitRoundedIcon />
									</Box>
								</Grid>
								<Grid item xs={6}>
									<Box
										borderWidth='1px'
										borderRadius='lg'
										px={2}
										py={2}
										boxShadow={'md'}>
										<EmojiEventsRoundedIcon />
									</Box>
								</Grid>
								<Grid item xs={6}>
									<Box
										borderWidth='1px'
										borderRadius='lg'
										px={2}
										py={2}
										boxShadow={'md'}>
										<StarsRoundedIcon />
									</Box>
								</Grid>
								<Grid item xs={6}>
									<Box
										borderWidth='1px'
										borderRadius='lg'
										px={2}
										py={2}
										boxShadow={'md'}>
										<MilitaryTechRoundedIcon />
									</Box>
								</Grid>
							</Grid>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Profile;
