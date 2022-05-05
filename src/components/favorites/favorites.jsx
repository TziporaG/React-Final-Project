import { PropaneSharp } from "@mui/icons-material";
import React, { useContext } from "react";
import { FavoritesContext } from "../app/context";
import FavoritesRecipeTile from "./FavoritesRecipeTile";

export const Favorites = () => {
  const listContext = useContext(FavoritesContext);
  return (
    <div>
      <h1 className="App-sub-header">Favorites</h1>

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
