import React from "react";
import { useState } from "react";
import ContentData from "./components/ContentData";
import Trending from "./components/Trending";

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import { Dropdown, DarkThemeToggle, TextInput, Navbar } from "flowbite-react";
import { searchMovie } from "./api";

const App = () => {
  const [resultMovie, setSearchMovie] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = async (q) => {
    setKeyword(q);
    if (q.length > 2) {
      const query = await searchMovie(q);
      setSearchMovie(query.results);
      setIsSearching(true);
    } else {
      setSearchMovie([]);
      setIsSearching(false);
    }
  };

  return (
    <Router>
      <div className="relative container mx-auto dark:bg-black pt-24 pb-1">
        <Navbar className="fixed top-0 left-0 flex w-full border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-4">
          <div className="flex md:order-2 justify-between lg:gap-0 gap-5">
            <Navbar.Toggle />
            <div className="lg:w-80 mr-5">
              <TextInput id="base" placeholder="Search a movie or tv show here..." type="text" sizing="md" onChange={({ target }) => search(target.value)} />
            </div>
            <DarkThemeToggle />
          </div>
          <Navbar.Collapse className="">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
            </Navbar.Brand>
            <div className="absoulte left-0 mt-1">
              <Dropdown label={<span className="text-xl dark:text-white lg:my-0 my-5"> Movies </span>} inline>
                <Dropdown.Item className="text-lg" to="">
                  <Link to="/movie/upcoming">Upcoming</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/movie/popular">Popular🔥</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/movie/top_rated">Top Rated</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/movie/now_playing">Now Playing</Link>
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="absoulte left-0 mt-1">
              <Dropdown label={<span className="text-xl dark:text-white"> TV Shows </span>} inline>
                <Dropdown.Item className="text-lg">
                  <Link to="/tv/airing_today">Airing Today</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/tv/popular">Popular🔥</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/tv/on_the_air">On TV</Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-lg">
                  <Link to="/tv/top_rated">Top Rated</Link>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <main className="lg:mt-5">
          <Routes>
            <Route exact path="/" element={<Trending searchMovie={resultMovie} keyword={keyword} />} />

            <Route path="/:type/:category" element={<ContentData searchMovie={resultMovie} keyword={keyword} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
