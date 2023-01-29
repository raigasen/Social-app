import React, { useState } from 'react';
import {
	Box,
	Avatar,
	Button,
	Menu,
	MenuList,
	MenuItem,
	Divider,
	Typography,
	Sheet,
} from '@mui/joy';
import { Stack } from '@mui/material';
import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';
// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
// import AddNewPost from './AddNewPost';
import { useAuth } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../utils/apiCalls';

export default function Navbar() {
	// for menu list
	const [anchorEl, setAnchorEl] = useState(null);
	// const [, error, setError, loading, operation] = useAxios()
	const navigate = useNavigate();
	const { setSession, setUser, user } = useAuth();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		// operation('logout')
		setAnchorEl(null);
		setSession(null);
		setUser(null);
		navigate('/login');
	};

	const handleProfile = () => {
		setAnchorEl(null);
		navigate('/update-profile');
	};

	return (
		<Sheet variant='soft' color='neutral' sx={{ paddingX: 4, paddingY: 3 }}>
			<Stack
				maxHeight={20}
				direction='row'
				alignItems='center'
				justifyContent='space-between'>
				<Box>
					<Link component={RouterLink} level='body1' to='/'>
						Logo
					</Link>
				</Box>

				<Stack direction='row' spacing={2}>
					{/* <AddNewPost /> */}
					{/* <Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)}
							</Button> */}
					<Button
						variant='outlined'
						cursor='pointer'
						onClick={handleClick}>
						<Avatar
							size='sm'
							src={
								user?.avatar ||
								'https://avatars.dicebear.com/api/male/username.svg'
							}
						/>
					</Button>
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
						<Stack direction='column' p={2} spacing={2}>
							<Avatar
								size='xl'
								src={
									user?.avatar ||
									'https://avatars.dicebear.com/api/male/username.svg'
								}
							/>

							<Typography level='body1' component='strong'>
								{`Hello ${user?.firstName}`}
							</Typography>
							<MenuList alignItems='center'>
								<MenuItem onClick={handleClose}>
									Your Servers
								</MenuItem>
								<MenuItem onClick={handleProfile}>
									Update profile
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									Logout
								</MenuItem>
							</MenuList>
						</Stack>
					</Menu>
				</Stack>
			</Stack>
		</Sheet>
	);
}
