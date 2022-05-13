import React, { useReducer } from "react";

const changeMenuReducer = (state, action) => {
  return action;
};

export const MenuContext = React.createContext();

export const MenuProvider = (props) => {
  const [menuState, dispatchNewMenu] = useReducer(changeMenuReducer, [{}]);

  return (
    <MenuContext.Provider
      value={{
        currMenuState: menuState,
        newMenuDispatch: dispatchNewMenu,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
