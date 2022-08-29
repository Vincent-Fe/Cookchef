import React from 'react';
import styles from './HeaderMenuResponsive.module.scss';

const HeaderMenuResponsive = ({ setPage }) => {
	return (
		<ul className={`${styles.menuContainer} card p-20`}>
			<li onClick={() => setPage('admin')}>Ajouter une recette</li>
			<li>Wishlist</li>
			<li>Connexion</li>
		</ul>
	);
};

export default HeaderMenuResponsive;
