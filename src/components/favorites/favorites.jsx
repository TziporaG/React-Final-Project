import { PropaneSharp } from "@mui/icons-material";
import React, { useContext } from "react";
import { FavoritesContext } from "../app/context";
import FavoritesRecipeTile from "./FavoritesRecipeTile";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function SearchBar(props) {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([{}]);

  const searchArray = (keyword) => {
    setSearchResults(
      props.array.filter((recipe) =>
        recipe.title.toLowerCase().match(new RegExp(keyword.toLowerCase(), "g"))
      )
    );
  };
  {
    /*
    const searchTerm = keyword.toLowerCase();
    return props.array.filter((recipe) => {
      setSearchResults(
        recipe.title.toLowerCase().match(new RegExp(searchTerm, "g"))
      );
    });
  };*/
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    searchArray(searchInput);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        <div>
          <TextField
            style={{ textAlign: "center", display: "block" }}
            error
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Button>
                    <SearchIcon
                      sx={{
                        color: red[700],
                      }}
                      onClick={(e) => handleSubmit(e)}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
      </form>
      <span>
        {searchResults?.map((recipe, index) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={index}
            style={{ textAlign: "center", display: "block", color: "red" }}
          >
            <li>{recipe.title}</li>
          </Link>
        ))}
        <br></br>
        {/*Render the entire card, took away because not sure about how to handel enpy element
        <FavoritesRecipeTile
            style={{ display: "inline" }}
            key={index}
            index={index}
            recipe={{
              title: recipe.title,
              id: recipe.id,
              index: recipe.index,
              image: recipe.image,
              isFavorited: true,
            }}
            recipes={props.array}
          ></FavoritesRecipeTile>))}*/}
      </span>
    </div>
  );
}

export const Favorites = () => {
  const listContext = useContext(FavoritesContext);
  return (
    <div>
      <h1 className="App-sub-header">Favorites</h1>
      <div style={{ margin: "auto" }}>
        <SearchBar array={listContext.listState}></SearchBar>
      </div>
      <div id="favGrid">
        {listContext.listState.reverse().map((recipe, index) => (
          <FavoritesRecipeTile
            key={index}
            index={index}
            recipe={recipe}
            recipes={listContext.listState}
          ></FavoritesRecipeTile>
        ))}
      </div>
    </div>
  );
};
