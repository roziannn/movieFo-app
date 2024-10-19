import React, { useState, useEffect } from "react";
import { trending } from "../api";

import { Card } from "flowbite-react";
import StarIcon from "../star.svg";

import moment from "moment";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingMovies = await trending();
      setMovies(trendingMovies);
    };
    console.log(`film:`, movies);

    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white">All Trending This Week</h1>
      <div className="grid mt-5 mb-14 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 cursor-pointer">
        {movies.map((movie, i) => (
          <Card
            key={i}
            className={`max-w-sm mx-auto shadow-none transition-shadow duration-300 hover:shadow-lg 
                dark:hover:shadow-blue-800 hover:shadow-gray-400
                ${isVisible ? "opacity-100 animate-fadeIn" : "opacity-0"}`}
            imgSrc={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          >
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {movie.title || movie.name} </h5>

            <div className="flex justify-between">
              <p className="font-normal text-gray-700 dark:text-gray-400"> {moment(movie.release_date).format(" MMM Y")} </p>
              <p className="flex font-normal text-gray-700 dark:text-gray-400">
                <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} /> <span className="Rate"> {movie.vote_average}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trending;
