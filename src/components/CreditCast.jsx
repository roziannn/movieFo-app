import React from "react";

const CreditCast = ({ credit }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-16">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Full Cast</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {credit?.cast?.slice(0, 12).map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="rounded-lg shadow-lg overflow-hidden w-24 h-24">
                <img src={item.profile_path ? `https://image.tmdb.org/t/p/w200${item.profile_path}` : "https://via.placeholder.com/200x300?text=No+Image"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-2 max-w-[100px] space-y-1">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                <p className="text-md text-gray-600 dark:text-gray-400 leading-tight">{item.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditCast;
