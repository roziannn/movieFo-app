import React from "react";

const BackdropHeader = ({ movie }) => {
  return (
    <div className="relative w-full h-[100vh] pt-16 bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundPosition: "center", backgroundSize: "cover" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-300 dark:from-black via-transparent to-transparent z-10"></div>
      <div className="absolute bottom-0 w-full p-8 md:p-24 z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-white drop-shadow-lg">{movie.original_name || movie.title}</h1>
        <p className="text-xl md:text-3xl text-dark dark:text-white mt-3">{movie.tagline}</p>
      </div>
    </div>
  );
};

export default BackdropHeader;
