import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from "@mui/material/colors";

export default function DropDown(props) {
  const handleDietChange = (event) => {
    props.setChosenFilterOptions({
      cuisine: props.chosenFilterOptions.cuisine ?? "",
      diet: event.target.value ?? "",
      intolerances: props.chosenFilterOptions.intolerances ?? "",
    });
  };

  const handleIntolerancesChange = (event) => {
    props.setChosenFilterOptions({
      cuisine: props.chosenFilterOptions.cuisine ?? "",
      diet: props.chosenFilterOptions.diet ?? "",
      intolerances: event.target.value ?? "",
    });
  };

  const handleCuisineChange = (event) => {
    props.setChosenFilterOptions({
      cuisine: event.target.value ?? "",
      diet: props.chosenFilterOptions.diet ?? "",
      intolerances: props.chosenFilterOptions.intolerances ?? "",
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Diet</InputLabel>
        <Select
          sx={{ backgroundColor: "white", opacity: "75%" }}
          value={props.chosenFilterOptions?.diet ?? ""}
          label="Diet"
          onChange={handleDietChange}
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
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Intolerances</InputLabel>
        <Select
          sx={{ backgroundColor: "white", opacity: "75%", width: "130px" }}
          value={props.chosenFilterOptions?.intolerances ?? ""}
          label="Intolerances"
          onChange={handleIntolerancesChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Dairy">Dairy</MenuItem>
          <MenuItem value="Gluten">Gluten</MenuItem>
          <MenuItem value="Peanut">Peanut</MenuItem>
          <MenuItem value="Soy">Soy</MenuItem>
          <MenuItem value="Shellfish">Shellfish</MenuItem>
          <MenuItem value="Tree Nut">Tree Nut</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Cuisine</InputLabel>
        <Select
          sx={{ backgroundColor: "white", opacity: "75%" }}
          value={props.chosenFilterOptions?.cuisine ?? ""}
          label="Diet"
          onChange={handleCuisineChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
          <MenuItem value="Indian">Indian</MenuItem>
          <MenuItem value="Italian">Italain</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
          <MenuItem value="Jewish">Jewish</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
          <MenuItem value="Thai">Thai</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
