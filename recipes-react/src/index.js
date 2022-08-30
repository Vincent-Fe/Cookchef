import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import { ApiContext } from './context/ApiContext';
import { BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	<Router>
		<ApiContext.Provider value="http://localhost:3333/api/recipes">
			<App />
		</ApiContext.Provider>
	</Router>
	</React.StrictMode>
);
