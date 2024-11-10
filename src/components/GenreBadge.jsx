import React from "react";

const GenreBadge = ({ movie }) => {
  return (
    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
      {movie?.genres?.map((genre) => (
        <span key={genre.id} className="px-3 py-1 border rounded-full text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600">
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default GenreBadge;
