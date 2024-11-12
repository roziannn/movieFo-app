import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DarkThemeToggle, Navbar } from "flowbite-react";
import MovieLogo from "../icons/logo.png";

const NavbarPartials = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      //search(event.target.value);
      const query = event.target.value;
      //console.log(searchMovie);
      navigate(`/search?q=${query}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setSearchQuery("");
  }, [navigate]);

  return (
    <Navbar className="fixed top-0 z-50 left-0 flex w-full border-0 lg:border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-5 pb-3 lg:mb-0 md:pb-5">
      <div className="flex w-full lg:w-auto md:order-2 px-0 lg:px-24 lg:gap-0 gap-3 justify-between lg:justify-start">
        <Navbar.Toggle />
        <div className="lg:w-80 mr-1 lg:mr-5 w-full">
          <div className="relative">
            <input
              type="text"
              className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search a movie or tv show ..."
              //onKeyDown={(e) => handleSearch(e)}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <DarkThemeToggle />
      </div>
      <Navbar.Collapse className="p-2 lg:p-0 dark:bg-transparent w-60 lg:w-auto md:w-full md:h-auto h-screen lg:h-auto top-0 left-0">
        <Navbar.Brand href="/" className="px-0 lg:pl-24">
          <img src={MovieLogo} alt="Movie Logo" width={38} className="mr-2" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
        </Navbar.Brand>
        <div className="absoulte left-0 mt-1 text-black dark:text-white mb-5 md:mb-0 lg:mb-0">
          <Dropdown label={<span className="text-xl text-black dark:text-white lg:my-0 md:my-0 my-5"> Movies </span>} inline>
            <Dropdown.Item className="text-lg">
              <Link to="/movie/upcoming">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Upcoming</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/movie/popular">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Popular</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/movie/top_rated">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Top Rated</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/movie/now_playing">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Now Playing</Navbar.Link>
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="absoulte left-0 mt-1 text-black dark:text-white">
          <Dropdown label={<span className="text-xl text-black dark:text-white"> TV Shows </span>} inline>
            <Dropdown.Item className="text-lg">
              <Link to="/tv/airing_today">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Airing Today</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/tv/popular">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Popular Show</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/tv/on_the_air">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> On The Air TV</Navbar.Link>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-lg">
              <Link to="/tv/top_rated">
                <Navbar.Link className="py-0 text-lg text-gray-700 dark:text-gray-300 cursor-pointer"> Top Rated</Navbar.Link>
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPartials;
