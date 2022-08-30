import React, { useContext, useState } from 'react';
import Recipe from './components/Recipe';
import styles from './Homepage.module.scss';
import { ApiContext } from '../../context/ApiContext';
import { useFetchData } from '../../hooks';
import Loading from '../../components/Loading/Loading';

const Homepage = (setUrl) => {
	const [filter, setFilter] = useState('');
	const [page, setPage] = useState(0);

	const URL_API = useContext(ApiContext);

	const [[recipes, setRecipes], isLoading] = useFetchData(URL_API, page);

	const updateLikeRecipe = updatedRecipe => {
		setRecipes(
			recipes.map(recipe =>
				recipe._id === updatedRecipe._id ? updatedRecipe : recipe
			)
		);
	};

	const deleteRecipe = _id => {
		setRecipes(recipes.filter(recipe => recipe._id !== _id));
	};

	const handleInput = e => {
		const filter = e.target.value;
		setFilter(filter.trim().toLowerCase());
	};

	return (
		<div className="flex-fill container p-20">
			<h2 className="my-30">Découvrez nos nouvelles recettes</h2>
			<div className={`card d-flex flex-column p-20 ${styles.contentCard}`}>
				<div
					className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
				>
					<i className="fa-solid fa-magnifying-glass mr-15"></i>
					<input
						type="text"
						placeholder="Rechercher"
						className="flex-fill"
						onInput={handleInput}
					/>
				</div>
				{isLoading && recipes.length === 0 ? (
					<Loading />
				) : (
					<div className={styles.grid}>
						{recipes
							.filter(recipe => recipe.title.toLowerCase().startsWith(filter))
							.map(recipe => (
								<Recipe
									key={recipe._id}
									setUrl={setUrl}
									recipe={recipe}
									toggleLikeRecipe={updateLikeRecipe}
									deleteRecipe={deleteRecipe}
								/>
							))}
					</div>
				)}
				<div>
					<button onClick={() => setPage(page + 1)} className="btn btn-primary">
						Charger plus de recettes
					</button>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
