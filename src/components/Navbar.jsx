import { Navbar, Dropdown, DarkThemeToggle } from "flowbite-react";
import { TextInput } from "flowbite-react";

import { BrowserRouter as Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Navbar className="fixed top-0 left-0 flex w-full border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-4">
        <div className="flex md:order-2 justify-between lg:gap-0 gap-5">
          <Navbar.Toggle />
          <div className="lg:w-80 mr-5">
            <TextInput id="base" placeholder="Search a movie or tv show here..." type="text" sizing="md" />
          </div>
          <DarkThemeToggle />
        </div>
        <Navbar.Collapse className="">
          <Navbar.Brand href="#">
            <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
          </Navbar.Brand>
          {/* <p className="text-xl mt-1 cursor-pointer dark:text-white">For You</p> */}
          <div className="absoulte left-0 mt-1">
            <Dropdown label={<span className="text-xl dark:text-white"> Movies </span>} inline>
              <Dropdown.Item className="text-lg pr-20" to="">
                <Link to="/movie/upcoming">Upcoming</Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-lg">Popular🔥</Dropdown.Item>
              <Dropdown.Item className="text-lg">Top Rated</Dropdown.Item>
              <Dropdown.Item className="text-lg">Now Playing</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="absoulte left-0 mt-1">
            <Dropdown label={<span className="text-xl dark:text-white"> TV Shows </span>} inline>
              <Dropdown.Item className="text-lg pr-20"> Airing Today </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Popular🔥 </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Top Rated </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Now Playing </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav;
