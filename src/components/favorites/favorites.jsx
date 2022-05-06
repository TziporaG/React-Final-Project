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

function SearchBar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  const searchArray = (keyword) => {
    const searchTerm = keyword.toLowerCase();
    return props.array.filter((recipe) => {
      props.setSearchResults(
        recipe.title.toLowerCase().match(new RegExp(searchTerm, "g"))
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    searchArray(searchInput);
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

export const Favorites = () => {
  const [serachResults, setSearchResults] = React.useState([{}]);
  const listContext = useContext(FavoritesContext);
  return (
    <div>
      <h1 className="App-sub-header">Favorites</h1>
      <SearchBar
        setSearchResults={setSearchResults}
        array={listContext.listState}
      ></SearchBar>
      <span>
        {listContext.listState.map((recipe, index) => (
          <FavoritesRecipeTile
            key={index}
            index={index}
            recipe={recipe}
            recipes={listContext.listState}
          ></FavoritesRecipeTile>
        ))}
      </span>
    </div>
  );
};
