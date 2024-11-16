import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchMovie } from "../api";

import StarIcon from "../star.svg";
import moment from "moment";
import Skeleton from "./Skeleton";

const SearchFeed = ({ loadingBarRef }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");

  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (keyword) {
      setIsLoading(true);
      loadingBarRef.current?.continuousStart();
      searchMovie(keyword)
        .then((query) => {
          setSearchResults(query.results);
          setIsLoading(false);
          loadingBarRef.current?.complete(); // complete loading bar
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [keyword]);

  return (
    <div className="lg:px-28 px-6 pt-0 lg:pt-10">
      <h1 className="text-2xl font-semibold dark:text-white">
        <div className=" dark:text-white flex justify-between movies-center">{searchMovie && searchMovie.length > 0 ? `Search results are found based on your search "${keyword}"` : " "}</div>
      </h1>
      <div className="grid mt-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Skeleton i={i} />)
          : searchResults
              .filter((item) => item.poster_path)
              .map((item, i) => (
                <Link key={i} to={`/${item.media_type}/detail/${item.id}`} className={`max-w-sm mx-auto shadow-none border-0 transition-shadow mb-4 duration-300 ${isVisible ? "visible" : ""}`}>
                  <img src={`${process.env.REACT_APP_BASEIMGURL}/${item.poster_path}`} alt={item.title || item.name} className="w-full sm:w-64 md:w-72 lg:w-80 h-auto rounded-lg" />
                  <div className="p-2">
                    <h5 className="text-xl bg-none font-bold tracking-tight text-gray-900 dark:text-white"> {item.title || item.name} </h5>
                    <div className="flex justify-between">
                      <p className="font-normal text-gray-700 dark:text-gray-400">{item.release_date ? moment(item.release_date).format("MMM Y") : "Unknown date"}</p>
                      <p className="flex font-normal text-gray-700 dark:text-gray-400">
                        <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} /> <span className="Rate">{item.vote_average}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
      </div>
    </div>
  );
};

export default SearchFeed;
