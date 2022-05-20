import React, { useContext } from "react";
import Button from "@mui/material/Button";
import backgroundImage from "./menu_background.jpg";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuContext } from "../app/MenuContext";

function RecipeLink(props) {
  return (
    <td>
      <Link to={`/recipe/${props.id}`} style={{ color: "black" }}>
        {props.title}
      </Link>
    </td>
  );
}

const DietDropDown = (props) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" display="inline">
      <InputLabel>Diet</InputLabel>
      <Select
        sx={{
          backgroundColor: "white",
          opacity: "75%",
          color: "black",
          borderColor: "black",
        }}
        value={props.chosenFilterOptions?.diet ?? ""}
        label="Diet"
        onChange={props.handleDietChange}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="Gluten Free">Gluten Free</MenuItem>
        <MenuItem value="Keto">Keto</MenuItem>
        <MenuItem value="Pescetarian">Pescetarian</MenuItem>
        <MenuItem value="Paleo">Paleo</MenuItem>
        <MenuItem value="Vegan">Vegan</MenuItem>
        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
        <MenuItem value="Whole30">Whole30</MenuItem>
      </Select>
    </FormControl>
  );
};

export const Menu = () => {
  const menuContext = useContext(MenuContext);
  const [chosenFilterOptions, setChosenFilterOptions] = React.useState("");

  const handleDietChange = (event) => {
    setChosenFilterOptions({
      diet: event.target.value ?? "",
    });
  };

  const generateMenu = () => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=f490623a08194292afaedba3e05a6dab&timeFrame=week&diet=${chosenFilterOptions.diet}`
    )
      .then((response) => response.json())
      .then((data) => {
        menuContext.newMenuDispatch(data.week);
        console.log("currWeeklyRecipes");
      });
  };

  return (
    <div className="App" style={{ backgroundColor: "#e8dbcc" }}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        className="favbackgroundImage"
      >
        <div style={{ width: "70%", margin: "auto" }}>
          <h1 id="mainHeader">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generate a Weekly Menu
          </h1>
          <DietDropDown
            chosenFilterOptions={chosenFilterOptions}
            handleDietChange={handleDietChange}
          ></DietDropDown>
          <br></br>
          <Button
            sx={{ color: "black", opacity: "85%", backgroundColor: "white" }}
            onClick={() => {
              generateMenu();
            }}
          >
            Click to Generate
          </Button>
        </div>
      </div>
      <div style={{ minHeight: "50vh" }}>
        <table id="menuTable">
          <tbody>
            <tr>
              <th>Meal</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
            <tr>
              <th>Sunday</th>
              {menuContext.currMenuState?.sunday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Monday</th>
              {menuContext.currMenuState?.monday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Tuesday</th>
              {menuContext.currMenuState?.tuesday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Wednesday</th>
              {menuContext.currMenuState?.wednesday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Thursday</th>
              {menuContext.currMenuState?.thursday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Friday</th>
              {menuContext.currMenuState?.friday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <th>Saturday</th>
              {menuContext.currMenuState?.saturday?.meals?.map((meal, key) => (
                <RecipeLink
                  key={key}
                  id={meal.id}
                  title={meal.title}
                ></RecipeLink>
              ))}
            </tr>
            <tr>
              <td colSpan={4}>
                Total calories for week:&nbsp;&nbsp;&nbsp;
                {menuContext.currMenuState?.sunday?.nutrients?.calories +
                  menuContext.currMenuState?.monday?.nutrients?.calories +
                  menuContext.currMenuState?.tuesday?.nutrients?.calories +
                  menuContext.currMenuState?.wednesday?.nutrients?.calories +
                  menuContext.currMenuState?.thursday?.nutrients?.calories +
                  menuContext.currMenuState?.friday?.nutrients?.calories +
                  menuContext.currMenuState?.saturday?.nutrients?.calories ||
                  ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
