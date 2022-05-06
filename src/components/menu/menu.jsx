import { Weekend } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function RecipeItem(props) {}

export const Menu = () => {
  const [currWeeklyRecipes, setCurrWeeklyRecipes] = React.useState([{}]);

  const generateMenu = () => {
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=f490623a08194292afaedba3e05a6dab&timeFrame=week"
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setCurrWeeklyRecipes(data.week);
          console.log("currWeeklyRecipes");
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  };

  return (
    <div>
      <Button
        onClick={() => {
          generateMenu();
        }}
      >
        Generate Menu!
      </Button>
      <table>
        <tbody>
          <tr>
            <th>Meal</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
          <tr>
            <th>Sunday</th>
            {currWeeklyRecipes?.sunday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Monday</th>
            {currWeeklyRecipes?.monday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Tuesday</th>
            {currWeeklyRecipes?.tuesday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Wednesday</th>
            {currWeeklyRecipes?.wednesday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Thursday</th>
            {currWeeklyRecipes?.thursday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Friday</th>
            {currWeeklyRecipes?.friday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
          <tr>
            <th>Saturday</th>
            {currWeeklyRecipes?.saturday?.meals?.map((meal, key) => (
              <td key={key}>{meal.id}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
