import { useEffect, useState } from "react";
import "./App.css";
import StarIcon from "./star.svg";

import { getMovieList, nowPlaying, searchMovie, topRated, upcoming } from "./api";
import { Navbar, Dropdown, DarkThemeToggle, TextInput, Card } from "flowbite-react";

import moment from "moment";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const PopularMovieList = () => {
    return (
      <div className="grid mt-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 cursor-pointer">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            ))
          : popularMovies.map((movie, i) => (
              <Card
                key={i}
                className={`max-w-sm mx-auto shadow-none transition-shadow duration-300 hover:shadow-lg 
                dark:hover:shadow-blue-800 hover:shadow-gray-400
                ${isVisible ? "opacity-100 animate-fadeIn" : "opacity-0"}`}
                imgSrc={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
              >
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {movie.title} </h5>

                <div className="flex justify-between">
                  <p className="font-normal text-gray-700 dark:text-gray-400"> {moment(movie.release_date).format(" MMM Y")} </p>
                  <p className="flex font-normal text-gray-700 dark:text-gray-400">
                    <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} /> <span className="Rate"> {movie.vote_average}</span>
                  </p>
                </div>
              </Card>
            ))}
      </div>
    );
  };

  const search = async (q) => {
    setIsLoading(true);
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    } else if (q.length === 0) {
      const popularMovies = await getMovieList();
      setPopularMovies(popularMovies);
    }

    setIsLoading(false);
  };

  const mappingCategory = {
    top_rated: topRated,
    popular: getMovieList,
    upcoming: upcoming,
    now_playing: nowPlaying,
  };

  const categoryFilter = (category) => {
    const fetchMovies = mappingCategory[category];

    if (fetchMovies) {
      fetchMovies()
        .then((data) => {
          console.log(`filter berdasarkan ${category}:`, data);
          setPopularMovies(data);
        })
        .catch((error) => console.error(`Error ketika fetching data`, error));
    } else {
      console.log("Invalid category");
    }
  };

  return (
    <div className="relative container mx-auto dark:bg-black py-24">
      <Navbar className="fixed top-0 left-0 flex w-full border-b border-gray-200 backdrop-opacity-10 backdrop-blur dark:bg-black/90 bg-white/90 lg:p-4">
        <div className="flex md:order-2 justify-between lg:gap-0 gap-5">
          <Navbar.Toggle />
          <div className="lg:w-80 mr-5">
            <TextInput id="base" placeholder="Search a movie or tv show here..." type="text" sizing="md" onChange={({ target }) => search(target.value)} />
          </div>
          <DarkThemeToggle />
        </div>
        <Navbar.Collapse className="">
          <Navbar.Brand href="#">
            <span className="self-center whitespace-nowrap text-2xl font-semibold  dark:text-white"> MovieFo </span>
          </Navbar.Brand>
          <p className="text-xl mt-1 cursor-pointer dark:text-white" onClick={() => categoryFilter("popular")}>
            For You
          </p>
          <div className="absoulte left-0 mt-1">
            <Dropdown label={<span className="text-xl dark:text-white"> Movies </span>} inline>
              <Dropdown.Item className="text-lg pr-20" onClick={() => categoryFilter("upcoming")}>
                Upcoming
              </Dropdown.Item>
              <Dropdown.Item className="text-lg" onClick={() => categoryFilter("popular")}>
                Popular🔥
              </Dropdown.Item>
              <Dropdown.Item className="text-lg" onClick={() => categoryFilter("top_rated")}>
                Top Rated
              </Dropdown.Item>
              <Dropdown.Item className="text-lg" onClick={() => categoryFilter("now_playing")}>
                Now Playing
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="absoulte left-0 mt-1">
            <Dropdown label={<span className="text-xl dark:text-white"> TV Shows </span>} inline>
              <Dropdown.Item className="text-lg pr-20"> Upcoming </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Popular🔥 </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Top Rated </Dropdown.Item>
              <Dropdown.Item className="text-lg"> Now Playing </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <h1 className="text-2xl font-semibold dark:text-white"> Top Picks for You </h1> <PopularMovieList />
    </div>
  );
}

export default App;
