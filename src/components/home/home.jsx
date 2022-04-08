import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

export function Home() {
  const [currRandomRecipes, setCurrRandomRecipes] = React.useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=5"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCurrRandomRecipes(result.Items);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  }, []);

  return (
    <div style={{ display: "grid" }}>
      {/* {currRandomRecipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          index={index}
          title={recipe.title}
          id={recipe.id}
          image={recipe.image}
          // handleFavoriteClicked
          // handleShareClicked
          // handleRecipeClicked
     ></RecipeCard>
      ))}*/}
    </div>
  );
}
