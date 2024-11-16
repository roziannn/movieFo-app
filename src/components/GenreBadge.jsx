import React from "react";

const GenreBadge = ({ movie }) => {
  return (
    <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
      {movie?.genres?.map((genre) => (
        <span key={genre.id} className="bg-blue-200 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default GenreBadge;
