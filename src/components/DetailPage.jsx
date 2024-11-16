import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CreditCast from "./CreditCast";
import GenreBadge from "./GenreBadge";
import BackdropHeader from "./BackdropHeader";

import { getCredits, getMovieDetails } from "../api";

const DetailPage = ({ loadingBarRef }) => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [credit, setCredit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchMovieDetailsAndCredits = async () => {
      setIsLoading(true);
      loadingBarRef.current?.continuousStart(); // start loading bar

      try {
        const [movieData, creditData] = await Promise.all([getMovieDetails(type, id), getCredits(type, id)]);

        setMovie(movieData);
        setCredit(creditData);
      } catch (error) {
        console.error("Error fetching movie details or credits:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsVisible(true), 100);
        loadingBarRef.current?.complete(); // complete loading bar
      }
    };

    fetchMovieDetailsAndCredits();
  }, [id, type, loadingBarRef]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 dark:bg-black">
      <BackdropHeader movie={movie} />
      <div className="max-w-screen-xl mx-auto p-6 md:p-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Poster Image */}
          <div className="w-full lg:w-1/4">
            <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title || movie.name} className="w-full h-auto object-cover rounded-lg shadow-xl" />
          </div>

          {/* Movie Information */}
          <div className="flex flex-col w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{movie.title || movie.name}</h2>
            <div className="text-gray-700 dark:text-gray-400">
              <p className="text-xl pb-4">
                {moment(movie.release_date).format("Y")} | {type === "tv" ? `${movie.number_of_episodes} Episodes |` : ""} {movie.spoken_languages?.[0]?.english_name}
              </p>

              <p className="text-lg md:text-xl mb-6">{movie.overview}</p>
            </div>
            <GenreBadge movie={movie} />
          </div>
        </div>
        <CreditCast credit={credit} />
      </div>
    </div>
  );
};

export default DetailPage;
