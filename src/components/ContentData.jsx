import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

import StarIcon from "../star.svg";
import moment from "moment";

const ContentData = ({ searchMovie }) => {
  const { type, category } = useParams();
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false); // reset visibility
    setIsLoading(true); // start loading state

    // loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [type, category, page]); // depend on type and category

  useEffect(() => {
    const getContent = async () => {
      const data = await fetchData(type, category, page);
      setContent(data.results);
    };

    getContent();
  }, [type, category, page]);

  // visibility effect after data loaded
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handlePrevPage = async () => {
    if (page > 1) {
      setIsLoading(true);
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = async () => {
    setIsLoading(true);
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dataToRender = searchMovie && searchMovie.length > 0 ? searchMovie : content;

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white">
        <div className="flex justify-between">
          <div className="text-black dark:text-white">
            {type.toUpperCase()} / {category.replace("_", " ")}
          </div>
          <div className="text-xl text-gray-500 dark:text-gray-300 font-normal"> Page {page}</div>
        </div>
      </h1>

      <div className="grid mt-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 cursor-pointer">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            ))
          : dataToRender &&
            dataToRender.map((item) => (
              <Card
                className={`max-w-sm mx-auto shadow-none transition-shadow duration-300 hover:shadow-lg 
            dark:hover:shadow-blue-800 hover:shadow-gray-400 ${isVisible ? "visible" : ""}`}
                imgSrc={`${process.env.REACT_APP_BASEIMGURL}/${item.poster_path}`}
                alt={item.title || item.name}
              >
                {/* <img src={`${process.env.REACT_APP_BASEIMGURL}/${item.poster_path}`} alt={item.title || item.name} /> */}
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {item.title || item.name} </h5>

                <div className="flex justify-between">
                  <p className="font-normal text-gray-700 dark:text-gray-400"> {moment(item.release_date).format(" MMM Y")} </p>
                  <p className="flex font-normal text-gray-700 dark:text-gray-400">
                    <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} /> <span className="Rate">{item.vote_average.toFixed(2)}</span>
                  </p>
                </div>
                {/* <h3>{item.title || item.name}</h3>
              <p>{item.release_date || item.first_air_date}</p> */}
              </Card>
            ))}
      </div>
      <nav className="flex justify-center items-center gap-x-4 min-w-max my-5">
        <button onClick={handlePrevPage} disabled={page === 1} className={`text-gray-500 hover:text-gray-900 p-2 inline-flex items-center md:mr-8 mr-1 ${page === 1 ? "cursor-not-allowed opacity-50" : ""}`}>
          <span className="w-10 h-10 rounded-full transition-all duration-150 flex justify-center items-center hover:border hover:border-gray-200">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 1L1.91421 4.58578C1.24755 5.25245 0.914213 5.58579 0.914213 6C0.914213 6.41421 1.24755 6.74755 1.91421 7.41421L5.5 11" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <a className="w-10 h-10 bg-transparent text-gray-500 p-2 justify-center inline-flex items-center rounded-full transition-all duration-150 hover:text-indigo-600" aria-current="page">
          {page}
        </a>

        <button onClick={handleNextPage} className="text-gray-500 hover:text-gray-900 p-2 inline-flex items-center md:ml-8 ml-1">
          <span className="w-10 h-10 rounded-full transition-all duration-150 flex justify-center items-center hover:border hover:border-gray-200">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L5.08578 7.41421C5.75245 6.74755 6.08579 6.41421 6.08579 6C6.08579 5.58579 5.75245 5.25245 5.08579 4.58579L1.5 1" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </nav>
    </div>
  );
};

export default ContentData;
