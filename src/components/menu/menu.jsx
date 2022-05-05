import { Weekend } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

function RecipeItem(props) {
  return (
    <div>
      {props.text?.map((meal, index) => (
        <div key={index}>{meal.title}</div>
      ))}
    </div>
  );
}

export const Menu = () => {
  const [currWeeklyRecipes, setCurrWeeklyRecipes] = React.useState([{}]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=f490623a08194292afaedba3e05a6dab&timeFrame=week"
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setCurrWeeklyRecipes(data.results);
          console.log("currWeeklyRecipes");
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  }, []);

  return (
    <div>
      {currWeeklyRecipes?.map((day, index) => (
        <RecipeItem key={index} index={index} text={day.meals}></RecipeItem>
      ))}
      {/*
      <table>
        {currWeeklyRecipes?.map((day, index) => (
          <tr key={index} >
            <th>{day}</th>
            {day?.meals.map((meal, index) => (
              <td>{meal.title}</td>
            ))}
          </tr>
        ))}
            </table>*/}
      {/*
      <table>
        <tr>
          <th>Meal</th>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
        </tr>
        <tr>
          <th>Breakfast</th>
          <td>
            {currWeeklyRecipes.monday.map((meal, index) => (
              <span>{meal.title}</span>
            ))}
          </td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
        </tr>
        <tr>
          <th>Lunch</th>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
        </tr>
        <tr>
          <th>Dinner</th>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
        </tr>
      </table>
      */}
    </div>
  );
};
