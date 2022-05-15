import React from "react";
import Header from "../Header/Header";
import "./App.css";
import SimpleBottomNavigation from "../MainNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "../Pages/Trending/Trending";
import Movies from "../Pages/Movies/Movies";
import Series from "../Pages/Series/Series";
import Search from "../Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" exact element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
