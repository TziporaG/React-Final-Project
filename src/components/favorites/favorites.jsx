import React, { useContext } from "react";
import { FavoritesContext } from "../app/FavoritesContext";
import FavoritesRecipeTile from "./FavoritesRecipeTile";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import backgroundImage from "./fav_background.jpg";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

function SearchBar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  const searchArray = (keyword) => {
    props.setSearchResults(
      props.array.filter((recipe) =>
        recipe.title.toLowerCase().match(new RegExp(keyword.toLowerCase(), "g"))
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    searchArray(searchInput);
  };

  const handleClear = () => {
    props.setSearchResults(null);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        <div>
          <TextField
            fullWidth
            style={{
              textAlign: "center",
              display: "block",
              backgroundColor: "white",
              opacity: "75%",
            }}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleClear();
            }}
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
              endAdornment: (
                <InputAdornment position="end">
                  <Button>
                    <BackspaceOutlinedIcon
                      sx={{
                        color: red[700],
                      }}
                      onClick={() => handleClear()}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
      </form>
    </div>
  );
}

export const Favorites = () => {
  const listContext = useContext(FavoritesContext);
  const [searchResults, setSearchResults] = React.useState(null);
  return (
    <div className="App">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          display: "flex",

          justifyContent: "center",
        }}
        className="favbackgroundImage"
      >
        <div style={{ width: "50%" }}>
          <h1 id="mainHeader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Favorites</h1>
          <SearchBar
            array={listContext.listState}
            setSearchResults={setSearchResults}
          ></SearchBar>
        </div>
      </div>
      <div id="favGrid">
        {searchResults
          ? searchResults?.map((recipe, index) => (
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
                recipes={listContext.listState}
              ></FavoritesRecipeTile>
            ))
          : listContext.listState.map((recipe, index) => (
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
