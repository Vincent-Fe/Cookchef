import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
	return (
		<div className="d-flex flex-row align-items-center justify-content-center flex-fill">
			<i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
		</div>
	);
};

export default Loading;
