import React, { useState } from "react";
import App from "./App";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import VideoListpage from "./Pages/VideoListsPage";
import Homepage from "./Pages/Homepage";
import NoPage from "./Pages/NoPage";
import Loading from "./Components/Loading";
import VideoFormPage from "./Pages/VideoFormPage";
import YourVideoListsPage from "./Pages/YourVideoListPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/callback" element={<Loading />} />
      {/* <Route exact path="/logout" element={ <Loading />} /> */}
      <Route path="/videos" element={<VideoListpage />} />
      <Route path="/your-video" element={<YourVideoListsPage />} />
      <Route path="/add/video" element={<VideoFormPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRoute;
