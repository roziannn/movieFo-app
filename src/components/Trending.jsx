import React, { useState, useEffect } from "react";
import { trending } from "../api";
import { Link } from "react-router-dom";

import StarIcon from "../star.svg";
import moment from "moment";

const Trending = ({ searchMovie, keyword, loadingBarRef }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      loadingBarRef.current?.continuousStart(); // start loading bar
      try {
        const trendingMovies = await trending();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsVisible(true), 100);
        loadingBarRef.current?.complete(); // Complete loading bar
      }
    };

    fetchTrendingMovies();
  }, [loadingBarRef]);

  const dataToRender = searchMovie && searchMovie.length > 0 ? searchMovie : movies;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:px-28 px-6 pt-0 lg:pt-10">
      <h1 className="text-2xl font-semibold dark:text-white">{searchMovie && searchMovie.length > 0 ? `Search Results for "${keyword}"` : "All Trending This Week"}</h1>
      <div className="grid mt-5 mb-14 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
        {dataToRender.map((movie, i) => (
          <Link key={i} to={`/${movie.media_type}/detail/${movie.id}`} className={`max-w-sm mx-auto shadow-none border-0 transition-shadow mb-4 duration-300 ${isVisible ? "visible" : ""}`}>
            <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title || movie.name} className="w-full sm:w-64 md:w-72 lg:w-80 h-auto rounded-lg" />
            <div className="p-2">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title || movie.name}</h5>
              <div className="flex justify-between">
                <p className="font-normal text-gray-700 dark:text-gray-400">{moment(movie.release_date).format("MMM Y")}</p>
                <p className="flex font-normal text-gray-700 dark:text-gray-400">
                  <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} />
                  <span className="Rate">{movie.vote_average}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
