import React, { useContext } from 'react';
import styles from './RecipeForm.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiContext } from '../../../context/ApiContext';

const RecipeForm = () => {
	const url = useContext(ApiContext);

	const defaultValues = {
		title: '',
		image: '',
	};

	const recipeSchema = yup.object({
		title: yup
			.string()
			.required('Le titre doit être renseigné')
			.min(10, 'Minimum 10 caractères')
			.max(30, 'Maximum 30 caractères'),
		image: yup
			.string()
			.required('Champ obligatoire')
			.url("Le format n'est pas valide"),
	});

	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
	} = useForm({ defaultValues, resolver: yupResolver(recipeSchema) });

	const submit = async values => {
		try {
			clearErrors();
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				reset(defaultValues);
			} else {
				setError('generic', {
					type: 'generic',
					message: 'Il y a eu une erreur.',
				});
			}
		} catch (error) {
			setError('generic', {
				type: 'generic',
				message: 'Il y a eu une erreur',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
		>
			<h2 className="mb-20">Ajouter une recette</h2>
			<div className="d-flex flex-column mb-20">
				<label>Titre de la recette</label>
				<input
					{...register('title')}
					type="text"
					placeholder="Titre de la recette"
				/>
				{errors.title && <p className="form-error">{errors.title.message}</p>}
			</div>
			<div className="d-flex flex-column mb-20">
				<label>Image de la recette</label>
				<input
					{...register('image')}
					type="text"
					placeholder="Image de la recette"
				/>
				{errors.image && <p className="form-error">{errors.image.message}</p>}
			</div>
			{errors.generic && <p className="form-error">{errors.generic.message}</p>}
			<div>
				<button disabled={isSubmitting} className="btn btn-primary">
					Sauvegarder
				</button>
			</div>
		</form>
	);
};

export default RecipeForm;
