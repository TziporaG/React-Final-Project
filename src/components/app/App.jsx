import "./App.css";
import React from "react";
import { Home } from "../home/home";
import { Favorites } from "../favorites/favorites";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { TodoProvider } from "./context";

function App() {
  return (
    <TodoProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
  );
}

export default App;
