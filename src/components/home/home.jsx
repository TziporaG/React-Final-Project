import React, { useRef, useEffect } from "react";
import RecipeTile from "./RecipeTile";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import backgroundImg from "./home_background.jpg";
import { red } from "@mui/material/colors";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import Button from "@mui/material/Button";
import DropDown from "./dropdown";

function SearchBar(props) {
  const [searchInput, setSearchInput] = React.useState("");

  const queryAPI = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=15&query="${searchInput}"&cuisine=${props.chosenFilterOptions.cuisine}&diet=${props.chosenFilterOptions.diet}&intolerances=${props.chosenFilterOptions.intolerances}`
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
    //just for myself...
    console.log(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=15&query="${searchInput}"&cuisine=${props.chosenFilterOptions.cuisine}&diet=${props.chosenFilterOptions.diet}&intolerances=${props.chosenFilterOptions.intolerances}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    queryAPI();
    props.myContainer.current.style.height = "300";
  };

  const handleClear = () => {
    setSearchInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
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
                <Button>
                  <SearchIcon
                    sx={{
                      color: red[700],
                    }}
                    onClick={handleSubmit}
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
  );
}
export function Home() {
  const myContainer = useRef(null);
  const [currRecipes, setCurrRecipes] = React.useState([{}]);
  const [chosenFilterOptions, setChosenFilterOptions] = React.useState("");
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
        ref={myContainer}
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
          <SearchBar
            setCurrRecipes={setCurrRecipes}
            myContainer={myContainer}
            chosenFilterOptions={chosenFilterOptions}
          />
          <br></br>
          <DropDown
            setChosenFilterOptions={setChosenFilterOptions}
            chosenFilterOptions={chosenFilterOptions}
          ></DropDown>
        </div>
      </div>

      <h1
        className="App-sub-header"
        style={{ textAlign: "left", marginLeft: "50px" }}
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
