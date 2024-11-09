import React from "react";
import { useState } from "react";
import ContentData from "./components/ContentData";
import Trending from "./components/Trending";
import MovieLogo from "../src/icons/logo.png";

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
      <div className="mx-auto dark:bg-black lg:pt-24 md:pt-36 pt-20 pb-1 px-6 lg:px-28">
        <main className="lg:mt-5">
          <Navbar className="fixed top-0 left-0 flex w-full border-0 lg:border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-4  pb-3 lg:mb-0 md:pb-5">
            <div className="flex w-full lg:w-auto md:order-2 lg:gap-0 gap-3 justify-between lg:justify-start">
              <Navbar.Toggle />
              <div className="lg:w-80 mr-1 lg:mr-5 w-full">
                <div class="relative">
                  <input
                    type="text"
                    class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search a movie or tv show ..."
                    onChange={({ target }) => search(target.value)}
                  />
                </div>
              </div>
              <DarkThemeToggle />
            </div>
            <Navbar.Collapse className="p-2 lg:p-0 bg-white dark:bg-transparent w-60 lg:w-auto md:w-full md:h-auto h-screen lg:h-auto  top-0 left-0">
              <Navbar.Brand href="/">
                <img src={MovieLogo} alt="Movie Logo" width={38} className="mr-2" />
                <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
              </Navbar.Brand>
              <div className="absoulte left-0 mt-1 text-black dark:text-white">
                <Dropdown label={<span className="text-xl text-black dark:text-white lg:my-0 md:my-0 my-5"> Movies </span>} inline>
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
              <div className="absoulte left-0 mt-1 text-black dark:text-white">
                <Dropdown label={<span className="text-xl text-black dark:text-white"> TV Shows </span>} inline>
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
