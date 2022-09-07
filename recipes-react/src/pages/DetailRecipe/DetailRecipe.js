import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ApiContext } from '../../context/ApiContext';
import styles from './DetailRecipe.module.scss';

const DetailRecipe = () => {
	let params = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState([]);
	const url = useContext(ApiContext);
	const id = params.id;

	useEffect(() => {
		const fetchRecipe = async () => {
			const response = await fetch(`${url}/${id}`);
			if (response.ok) {
				const newRecipe = await response.json();
				setRecipe(newRecipe);
			}
		};
		fetchRecipe();
	}, [url, id]);

	return (
		<div className="d-flex flex-column flex-fill p-20">
			<div className="flex-fill container d-flex flex-column p-20">
				<div>
					<button
						onClick={() => navigate(-1)}
						className="btn btn-reverse-primary mb-20"
					>
						Retour
					</button>
				</div>
				<div className={`${styles.contentCard} card d-flex flex-row p-20`}>
					<div
						className={`${styles.imgRecipe} d-flex justify-content-center align-items-center`}
					>
						<img src={recipe.image} alt={recipe.title} />
					</div>

					<div
						className="d-flex flex-fill flex-column justify-content-between
				p-20"
					>
						<div className="d-flex flex-row justify-content-between align-items-center">
							<h3 className="my-30">{recipe.title}</h3>
						</div>
						<div
							className={`d-flex flex-fill flex-column ${styles.ingredientContainer}`}
						>
							<h4 className="mb-10">Ingrédients</h4>
							<ul className={styles.ingredientList}>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
								<li className="mb-10">Liste des Ingrédients</li>
							</ul>
						</div>
						<div className="d-flex flex-row justify-content-center align-items-center">
							<Link
								to={`/admin/${recipe._id}`}
								className="btn btn-reverse-primary mr-5"
							>
								Modifier
							</Link>
							<button className="btn btn-primary">Supprimer</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailRecipe;
