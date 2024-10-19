import React from "react";
import ContentData from "./components/ContentData";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import { Dropdown, DarkThemeToggle, TextInput, Navbar } from "flowbite-react";
import Nav from "./components/Navbar";
import Trending from "./components/Trending";

const App = () => {
  return (
    <Router>
      <div className="relative container mx-auto dark:bg-black py-24">
        <Navbar className="fixed top-0 left-0 flex w-full border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-4">
          <div className="flex md:order-2 justify-between lg:gap-0 gap-5">
            <Navbar.Toggle />
            <div className="lg:w-80 mr-5">
              <TextInput id="base" placeholder="Search a movie or tv show here..." type="text" sizing="md" />
            </div>
            <DarkThemeToggle />
          </div>
          <Navbar.Collapse className="">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
            </Navbar.Brand>
            <div className="absoulte left-0 mt-1">
              <Dropdown label={<span className="text-xl dark:text-white"> Movies </span>} inline>
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
        <main>
          <Routes>
            <Route exact path="/" element={<Trending />} />

            <Route path="/:type/:category" element={<ContentData />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
