import React, { useState, useEffect } from "react";
import RecipeTile from "./RecipeTile";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import backgroundImg from "./home_background4.jpg";
import { red } from "@mui/material/colors";

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
          fullWidth
          sx={{ backgroundColor: "white", opacity: "75%" }}
          error
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: red[700],
                  }}
                  onClick={handleSubmit}
                />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
    </form>
  );
}
export function Home() {
  const [currRecipes, setCurrRecipes] = React.useState([{}]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=10"
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
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="backgroundImage"
      >
        <div style={{ width: "50%", margin: "auto" }}>
          <h1 id="mainHeader">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search Any Recipe Here
          </h1>
          <br></br>
          <SearchBar setCurrRecipes={setCurrRecipes} />
        </div>
      </div>

      <h1
        className="App-sub-header"
        style={{ textAlign: "left", marginLeft: "40px" }}
      >
        Top Picks
      </h1>
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
