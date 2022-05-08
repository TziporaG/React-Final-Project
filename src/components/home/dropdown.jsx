import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from "@mui/material/colors";

export default function DropDown(props) {
  //const [age, setAge] = React.useState('');

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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Intolerances</InputLabel>
        <Select
          sx={{ backgroundColor: "white", opacity: "75%" }}
          value={props.chosenFilterOptions?.intolerances ?? ""}
          label="Intolerances"
          onChange={handleIntolerancesChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Dairy">Dairy</MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
