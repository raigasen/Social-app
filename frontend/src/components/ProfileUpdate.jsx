import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/material/Stack';
import Divider from '@mui/joy/Divider';
import Navbar from './Navbar';

import { Link } from 'react-router-dom';

const ProfileUpdate = () => {
	const [files, setFiles] = useState([]);

	function onFileUpload(event) {
		event.preventDefault();

		let id = event.target.id;
		let file = event.target.files[0];

		setFiles([...files, { field: id, file }]);
	}

	function handleSubmit(e) {
		e.preventDefault();

		const apiInstance = axios.create();

		apiInstance.interceptors.request.use((config) => {
			console.log('>>axios token', localStorage.getItem('session'));
			if (localStorage.getItem('session')) {
				const token = `${localStorage.getItem('session')}`;
				config.headers['Authorization'] = token;
				config.headers['Content-Type'] = 'multipart/form-data';
			}
			return config;
		});

		let formData = new FormData();
		files.map((file) => formData.append(file.field, file.file));

		apiInstance
			.post('http://localhost:4000/update-profile', formData)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	}

	const [imageURLs, setImageURLs] = useState([]);

	return (
		<Box>
			<Navbar></Navbar>

			<form onSubmit={handleSubmit} className='upload--container'>
				{/* <h1> Multiple File Inputs with Signle Submit Button </h1> */}

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
						<Stack spacing={4} alignItems='center' justify='center'>
							<Box
								borderWidth='1px'
								borderRadius='lg'
								px={4}
								py={3}
								boxShadow={'md'}>
								Avatar
							</Box>

							<Box
								borderWidth='1px'
								borderRadius='lg'
								px={4}
								py={3}
								boxShadow={'md'}>
								<input
									onChange={onFileUpload}
									id={'avatar'}
									type='file'
								/>
								{imageURLs.map((avatarSrc) => (
									<img src={avatarSrc} />
								))}
							</Box>
						</Stack>
					</Box>
				</Stack>

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
						<Stack spacing={4} alignItems='center' justify='center'>
							<Box
								borderWidth='1px'
								borderRadius='lg'
								px={4}
								py={3}
								boxShadow={'md'}>
								Backdrop
							</Box>

							<Box
								borderWidth='1px'
								borderRadius='lg'
								px={4}
								py={3}
								boxShadow={'md'}>
								<input
									onChange={onFileUpload}
									id={'backdrop'}
									//   accept=".jpeg, .pdf"
									type='file'
								/>
							</Box>
						</Stack>
					</Box>
				</Stack>
				<Stack spacing={4} alignItems='center' justify='center'>
					<Button
						variant='contained'
						href='/profile'
						size='large'
						type='submit'>
						Submit
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default ProfileUpdate;
