import React, { useState, useEffect } from "react";
import RecipeTile from "./RecipeTile";
import { RecipeContext } from "../app/context";

export function Home() {
  const [currRandomRecipes, setCurrRandomRecipes] = React.useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=10"
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setCurrRandomRecipes(data.results);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  }, []);

  return (
    <div className="homepage">
      <div id="grid">
        {currRandomRecipes?.map((recipe, index) => (
          <RecipeTile
            key={index}
            index={index}
            title={recipe.title}
            id={recipe.id}
            image={recipe.image}

            // handleFavoriteClicked
            // handleShareClicked
            // handleRecipeClicked
          ></RecipeTile>
        ))}
      </div>
    </div>
  );
}
