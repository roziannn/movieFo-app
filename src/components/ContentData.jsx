import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useParams, Link } from "react-router-dom";

import StarIcon from "../star.svg";
import moment from "moment";
import Skeleton from "./Skeleton";

const ContentData = ({ searchMovie, keyword }) => {
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

  const dataToRender = content;

  return (
    <div className="lg:px-28 px-6 pt-0 lg:pt-10">
      <h1 className="text-2xl font-semibold dark:text-white">
        <div className=" dark:text-white flex justify-between items-center">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}`}
          <div className="text-lg text-gray-500 dark:text-gray-300 font-normal"> Page {page}</div>
        </div>
      </h1>

      <div className="grid mt-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Skeleton i={i} />)
          : dataToRender &&
            dataToRender.map((item, i) => (
              <Link key={i} to={`/${type}/detail/${item.id}`} className={`max-w-sm mx-auto shadow-none border-0 transition-shadow mb-4 duration-300 ${isVisible ? "visible" : ""}`}>
                <img src={`${process.env.REACT_APP_BASEIMGURL}/${item.poster_path}`} alt={item.title || item.name} className="w-full sm:w-64 md:w-72 lg:w-80 h-auto rounded-lg" />
                <div className="p-2">
                  <h5 className="text-xl bg-none font-bold tracking-tight text-gray-900 dark:text-white"> {item.title || item.name} </h5>
                  <div className="flex justify-between">
                    <p className="font-normal text-gray-700 dark:text-gray-400"> {moment(item.release_date).format(" MMM Y")} </p>
                    <p className="flex font-normal text-gray-700 dark:text-gray-400">
                      <img src={StarIcon} alt="Star Rating Icon" style={{ width: "17px", height: "22px", marginRight: "5px" }} /> <span className="Rate">{item.vote_average}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      <nav className="flex justify-center items-center gap-x-4 min-w-max my-5">
        <button onClick={handlePrevPage} disabled={page === 1} className={`text-gray-500 hover:text-gray-900 p-2 inline-flex items-center md:mr-8 mr-1 ${page === 1 ? "cursor-not-allowed opacity-50" : ""}`}>
          <span className="w-10 h-10 rounded-full transition-all duration-150 flex justify-center items-center hover:border hover:border-gray-200">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 1L1.91421 4.58578C1.24755 5.25245 0.914213 5.58579 0.914213 6C0.914213 6.41421 1.24755 6.74755 1.91421 7.41421L5.5 11" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <a className="w-10 h-10 bg-transparent text-gray-500 p-2 justify-center inline-flex items-center rounded-full transition-all duration-150 hover:text-blue-600" aria-current="page">
          {page}
        </a>

        <button onClick={handleNextPage} className="text-gray-500 hover:text-gray-900 p-2 inline-flex items-center md:ml-8 ml-1">
          <span className="w-10 h-10 rounded-full transition-all duration-150 flex justify-center items-center hover:border hover:border-gray-200">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 11L5.08578 7.41421C5.75245 6.74755 6.08579 6.41421 6.08579 6C6.08579 5.58579 5.75245 5.25245 5.08579 4.58579L1.5 1" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </nav>
    </div>
  );
};

export default ContentData;
