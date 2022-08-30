import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";

const DetailRecipe = () => {
  let params = useParams();
  const [recipe, setRecipe] = useState([]);
  const url = useContext(ApiContext);
  const id = params.id

  useEffect(() => {
    const fetchRecipe = async () => {
      const id = params.id;
      const response = await fetch(`${url}/${id}`);
      if (response.ok) {
        const newRecipe = await response.json();
        setRecipe(newRecipe);
      }
    };
    fetchRecipe();
  }, [url, id]);

  
  return (
    <div>
      <h2>{recipe.title}</h2>
    </div>
  );
};

export default DetailRecipe;
