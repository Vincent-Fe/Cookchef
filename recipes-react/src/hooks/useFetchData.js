import { useEffect, useState } from 'react';

export const useFetchData = (url, page) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState([]);

	useEffect(() => {
		let cancel = false;
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const queryParam = new URLSearchParams();
				if (page) {
					queryParam.append('skip', (page) * 9);
					queryParam.append('limit', 9);
				}

				const response = await fetch(`${url}?${queryParam}`);
				if (response.ok && !cancel) {
					const newData = await response.json();
					setData(x => Array.isArray(newData) && [...x, ...newData]);
				}
			} catch (error) {
				setError('ERREUR');
			}
			// finally {
			// 	if (!cancel) {
			// 		setIsLoading(false);
			// 	}
			// }
		};
		fetchData();
		return () => (cancel = true);
	}, [url, page]);

	return [[data, setData], isLoading, error];
};
