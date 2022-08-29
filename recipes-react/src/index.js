import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import { ApiContext } from './context/ApiContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApiContext.Provider value="http://localhost:3333/api/recipes">
			<App />
		</ApiContext.Provider>
	</React.StrictMode>
);
