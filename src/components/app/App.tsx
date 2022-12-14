import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import AddRoom from '../../pages/AddRoom/AddRoom';
import EditProfile from '../../pages/EditProfile/EditProfile';
import EditRoom from '../../pages/EditRoom/EditRoom';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Room from '../../pages/Room/Room';
import StartPage from '../../pages/StartPage/StartPage';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAuthMe } from '../../redux/auth/asyncActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsAuth } from '../../redux/auth/slice';
import About from '../../pages/About/About';
import Statistics from '../../pages/Users/Users';
import Version from '../../pages/Version/Version';
import FullUser from '../../pages/FullUser/FullUser';
//import styles from './app.module.scss';

const NotFound = React.lazy(
	() => import(/* webpackChunkName: 'NotFound'*/ '../../pages/NotFound/NotFound'),
);
const SignIn = React.lazy(
	() => import(/* webpackChunkName: 'SignIn'*/ '../../pages/SignIn/SignIn'),
);
const SignUp = React.lazy(
	() => import(/* webpackChunkName: 'SignUp'*/ '../../pages/SignUp/SignUp'),
);

function App() {
	const dispatch = useAppDispatch();

	//проверка на авторизацию
	React.useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route
					path=""
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<Home />
						</Suspense>
					}
				/>

				<Route
					path="*"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<NotFound />
						</Suspense>
					}
				/>

				<Route
					path="/editProfile"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<EditProfile />
						</Suspense>
					}
				/>

				<Route
					path="/addroom"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<AddRoom />
						</Suspense>
					}
				/>

				<Route
					path="/editroom/:id"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<EditRoom />
						</Suspense>
					}
				/>

				<Route
					path="/rooms/:id"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<Room />
						</Suspense>
					}
				/>

				<Route
					path="/users/:id"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<FullUser />
						</Suspense>
					}
				/>

				<Route
					path="/start"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<StartPage />
						</Suspense>
					}
				/>
				<Route
					path="/profile"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<Profile />
						</Suspense>
					}
				/>
				<Route
					path="/login"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<SignIn />
						</Suspense>
					}
				/>

				<Route
					path="/registration"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<SignUp />
						</Suspense>
					}
				/>
				{/*  */}

				<Route
					path="/about"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<About />
						</Suspense>
					}
				/>
				<Route
					path="/users"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<Statistics />
						</Suspense>
					}
				/>
				<Route
					path="/version"
					element={
						<Suspense fallback={<CircularProgress color="secondary" />}>
							<Version />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
