import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/cookchef-d.png';
import styles from './Header.module.scss';
import HeaderMenuResponsive from './HeaderMenuResponsive';

const Header = ({ setPage }) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<header className={`${styles.header} d-flex flex-row align-items-center`}>
			<NavLink to ='/' className="flex-fill">
				<img src={logo} alt="cookchef logo" />
			</NavLink>
			<ul className={styles.headerList}>
				<NavLink to ='/admin' 
					className="btn btn-primary mr-15"
				>
					Ajouter une recette
				</NavLink>
				<button className="mr-15 btn btn-reverse-primary">Wishlist</button>
				<button className="btn btn-primary">connexion</button>
			</ul>
			<i
				onClick={() => setShowMenu(!showMenu)}
				className={`${styles.headerXs} fa-solid fa-bars`}
			></i>
			{showMenu && (
				<>
					<div onClick={() => setShowMenu(false)} className="calc"></div>
					<HeaderMenuResponsive setPage={setPage} />
				</>
			)}
		</header>
	);
};

export default Header;
