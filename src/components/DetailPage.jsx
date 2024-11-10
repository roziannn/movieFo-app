import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CreditCast from "./CreditCast";
import GenreBadge from "./GenreBadge";
import BackdropHeader from "./BackdropHeader";

import { getCredits, getMovieDetails } from "../api";

const DetailPage = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [credit, setCredit] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(type, id);
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id, type]);

  useEffect(() => {
    const fetchCredits = async () => {
      const data = await getCredits(type, id);
      setCredit(data);
    };
    fetchCredits();
  }, [id, type]);

  // console.log("credit:", credit);

  if (!movie) return <div>Loading...</div>;

  console.log(movie);

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
                {moment(movie.release_date).format("Y")} | {movie.number_of_episodes} Episode | {movie.spoken_languages?.[0]?.english_name}
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
