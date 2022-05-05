import React, { useState, useEffect } from "react";
import RecipeTile from "./RecipeTile";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import backgroundImg from "./home_background2.jpg";
import { color } from "@mui/system";

function SearchBar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  const queryAPI = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=15&query=${searchInput}`
    )
      .then((response) => response.json())
      .then(
        (data) => {
          props.setCurrRecipes(data.results);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    queryAPI();
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div>
        <TextField
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          label=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} onClick={handleSubmit} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}
export function Home() {
  const [currRecipes, setCurrRecipes] = React.useState([{}]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=15"
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setCurrRecipes(data.results);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  }, []);

  return (
    <div className="homepage">
      <img src={backgroundImg} class="backgroundImage" />
      <SearchBar setCurrRecipes={setCurrRecipes} style={{ zIndex: "100" }} />
      <div id="grid">
        {currRecipes?.map((recipe, index) => (
          <RecipeTile
            key={index}
            index={index}
            title={recipe.title}
            id={recipe.id}
            image={recipe.image}
            isFavorited={false}
          ></RecipeTile>
        ))}
      </div>
    </div>
  );
}
