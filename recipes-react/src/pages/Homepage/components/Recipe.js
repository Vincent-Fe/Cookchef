import React, { useContext } from 'react';
import styles from './Recipe.module.scss';
import { ApiContext } from '../../../context/ApiContext';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe, toggleLikeRecipe, deleteRecipe }) => {
	// const [liked, setLiked] = useState(false);

	const URL_API = useContext(ApiContext);

	const handleClickLike = async () => {
		try {
			const response = await fetch(`${URL_API}/update/${recipe._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					liked: !recipe.liked,
				}),
			});
			if (response.ok) {
				const updatedRecipe = await response.json();
				toggleLikeRecipe(updatedRecipe);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickDelete = async event => {
		event.stopPropagation();
		try {
			const response = await fetch(`${URL_API}/delete/${recipe._id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				deleteRecipe(recipe._id);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`d-flex flex-column ${styles.recipe} `}>
			<i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
			<Link to={`/recipe/${recipe._id}`} className={`${styles.imageContainer}`}>
				<img src={recipe.image} alt="Recette" />
			</Link>
			<div
				className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
			>
				<h3 className="mb-20">{recipe.title}</h3>
				<i
					onClick={handleClickLike}
					className={`${
						recipe.liked ? 'text-primary' : ''
					} fa-solid fa-lg fa-heart`}
				></i>
			</div>
		</div>
	);
};

export default Recipe;
