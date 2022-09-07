import Cookies from 'js-cookie';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { UserContext } from '../../../context/UserContext';
import styles from '../../Admin/components/RecipeForm.module.scss';

const AuthFrom = () => {
	const [, setAuth] = useContext(AuthContext);
	const [, setCurrentUser] = useContext(UserContext);

	let navigate = useNavigate();

	let defaultValues = {
		email: '',
		password: '',
	};

	const {
		formState: { isSubmitting },
		register,
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		defaultValues,
	});

	const submit = async values => {
		try {
			clearErrors();
			const response = await fetch('http://localhost:3333/api/users/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'same-origin',
				body: JSON.stringify(values),
			});

			if (response.ok) {
				const user = await response.json();
				Cookies.set('jwt', user.token);
				setAuth(() => {
					const savedCookie = Cookies.get('jwt');
					return savedCookie || '';
				});
				localStorage.setItem('currentUser', JSON.stringify(user));

				setCurrentUser(() => {
					const saved = localStorage.getItem('currentUser');
					const initialValue = JSON.parse(saved);
					return initialValue || '';
				});

				navigate('/');
			}
		} catch (error) {
			console.log(error);
			setError('generic', {
				type: 'generic',
				message: 'Il y a eu une erreur !!',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
		>
			<h2>Se connecter</h2>
			<div className="d-flex flex-column mb-20">
				<label>Email</label>
				<input {...register('email')} type="email" placeholder="Email" />
				<p>Error</p>
			</div>
			<div className="d-flex flex-column mb-20">
				<label>Mot de passe</label>
				<input
					{...register('password')}
					type="password"
					placeholder="Mot de passe"
				/>
				<p>Error</p>
			</div>
			<div>
				<button disabled={isSubmitting} className="btn btn-primary">
					Se connecter
				</button>
			</div>
		</form>
	);
};

export default AuthFrom;
