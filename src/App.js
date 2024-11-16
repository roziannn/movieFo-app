import React, { useRef } from "react";
import ContentData from "./components/ContentData";
import Trending from "./components/Trending";
import DetailPage from "./components/DetailPage";
import NavbarPartials from "./components/NavbarPartials";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

import SearchFeed from "./components/SearchFeed";

const App = () => {
  const loadingBarRef = useRef(null);

  return (
    <Router>
      <LoadingBar color="#2563EB" ref={loadingBarRef} />
      <RouteChangeHandler loadingBarRef={loadingBarRef} />
      <div className="mx-auto dark:bg-black lg:pt-20 md:pt-36 pt-20 pb-1">
        <main>
          <NavbarPartials />
          <Routes>
            <Route exact path="/" element={<Trending loadingBarRef={loadingBarRef} />} />
            <Route path="/search" element={<SearchFeed loadingBarRef />} />
            <Route path="/:type/:category" element={<ContentData loadingBarRef />} />
            <Route path="/:type/detail/:id" element={<DetailPage loadingBarRef />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const RouteChangeHandler = ({ loadingBarRef }) => {
  const location = useLocation();

  React.useEffect(() => {
    loadingBarRef.current?.continuousStart();
    return () => {
      loadingBarRef.current?.complete();
    };
  }, [location]);

  return null;
};

export default App;
