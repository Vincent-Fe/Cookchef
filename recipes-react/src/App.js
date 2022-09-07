import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import styles from './assets/styles/App.module.scss';
import Admin from './pages/Admin/Admin';
import { Routes, Route } from 'react-router-dom';
import DetailRecipe from './pages/DetailRecipe/DetailRecipe';
import Auth from './pages/Auth/Auth';
import Cookies from 'js-cookie';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';

function App() {
	const [auth, setAuth] = useState(() => {
		const savedCookie = Cookies.get('jwt');
		return savedCookie || '';
	});
	const [currentUser, setCurrentUser] = useState(() => {
		const saved = localStorage.getItem('currentUser');
		const initialValue = JSON.parse(saved);
		return initialValue || '';
	});

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			<UserContext.Provider value={[currentUser, setCurrentUser]}>
				<div className={`d-flex flex-column ${styles.appContainer}`}>
					<Header />
					<Routes>
						<Route exact path="/" element={<Homepage />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/recipe/:id" element={<DetailRecipe />} />
						<Route path="/auth/login" element={<Auth />} />
					</Routes>
					<Footer />
				</div>
			</UserContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
