import React from "react";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoListpage from "./Pages/VideoListsPage";
import Homepage from "./Pages/Homepage";
import NoPage from "./Pages/NoPage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/videos" element={<VideoListpage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
