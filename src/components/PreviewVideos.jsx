import React from "react";

const PreviewVideos = ({ previewVideo }) => {
  return (
    <div className="pt-16">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Videos</h2>
        {previewVideo?.results?.length === 0 || !previewVideo?.results ? (
          <div className="text-xl font-semibold text-gray-600 dark:text-gray-400">No Videos Found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
            {previewVideo?.results?.slice(0, 6).map((video, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer">
                <div className="rounded-lg shadow-lg overflow-hidden w-full">
                  <div className="relative w-full pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.name}
                    />
                  </div>
                </div>
                <div className="text-center mt-2 max-w-[200px] space-y-1"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewVideos;
