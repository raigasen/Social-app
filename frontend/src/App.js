import React from 'react';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/Signup';
import Profile from './components/Profile';
import ProfileUpdate from './components/ProfileUpdate';
import HomePage from './components/HomePage';
import PageNotFound from './components/404Page';
import AuthRoute from './AuthRoute';
import { UserProvider } from './context/userContext';

const App = () => {
	return (
		<>
			<UserProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/register' element={<SignUp />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/'
							element={
								<>
									{/* <AuthRoute> */}
									<Outlet />
									{/* </AuthRoute> */}
								</>
							}>
							<Route index path='/' element={<HomePage />} />

							<Route
								path='/profile/:userId'
								element={<Profile />}
							/>
							<Route
								path='/update-profile'
								element={<ProfileUpdate />}
							/>
							<Route path='*' element={<PageNotFound />} />
						</Route>

						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</UserProvider>
		</>
	);
};

export default App;
