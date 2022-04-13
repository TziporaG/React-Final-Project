import React, { useState, useEffect } from "react";

export const Recipe = () => {
  const recipeID = window.location.hash.split("/")[2];
  const [currRecipe, setCurrRecipe] = React.useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/card?apiKey=f490623a08194292afaedba3e05a6dab`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrRecipe(data.url);
      });
  }, []);

  console.log(recipeID);
  console.log(currRecipe);

  return (
    <div>
      <img className="recipe" src={currRecipe} />
    </div>
  );
};
