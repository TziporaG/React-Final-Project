import React, { useReducer, useEffect } from "react";

var initialList = [{}];
const changeRecipeListReducer = (state, action) => {
  var newRecipeList = [];
  switch (action.type) {
    case "update":
      newRecipeList = action.currRecipeList;
      return newRecipeList;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const RecipeListContext = React.createContext();

export const RecipeListProvider = (props) => {
  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=f490623a08194292afaedba3e05a6dab&number=10"
    )
      .then((response) => response.json())
      .then(
        (data) => {
          dispatchChangeRecipeList({
            type: "update",
            currRecipeList: data.results,
          });
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {}
      );
  }, []);

  const [recipeListState, dispatchChangeRecipeList] = useReducer(
    changeRecipeListReducer,
    initialList
  );

  return (
    <RecipeListContext.Provider
      value={{
        listState: recipeListState,
        listDispatch: dispatchChangeRecipeList,
      }}
    >
      {props.children}
    </RecipeListContext.Provider>
  );
};
