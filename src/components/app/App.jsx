import "./App.css";
import React from "react";
import { Home } from "../home/home";
import { Favorites } from "../favorites/favorites";
import { Recipe } from "../recipe/recipe";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { FavoritesProvider } from "./FavoritesContext";
import { RecipeListProvider } from "./RecipeListContext";
import { MenuProvider } from "./MenuContext";
function App() {
  return (
    <MenuProvider>
      <RecipeListProvider>
        <FavoritesProvider>
          <HashRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </HashRouter>
        </FavoritesProvider>
      </RecipeListProvider>
    </MenuProvider>
  );
}

export default App;
