import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import styles from './assets/styles/App.module.scss';
import { useState } from 'react';
import Admin from './pages/Admin/Admin';

function App() {
	const [page, setPage] = useState('homepage');

	return (
		<div className={`d-flex flex-column ${styles.appContainer}`}>
			<Header setPage={setPage} />
			{page === 'homepage' && <Homepage />}
			{page === 'admin' && <Admin />}

			<Footer />
		</div>
	);
}

export default App;
