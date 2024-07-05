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
import Header from "./Components/Header";
import LogoutCallback from "./Components/LogoutCallback";

const AppRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/callback" element={<Loading />} />
      <Route exact path="/logout-callback" element={<LogoutCallback />} />
      {/* <Route exact path="/logout" element={ <Loading />} /> */}
      <Route path="/videos" element={<> <Header />
        <VideoListpage />
      </> } />
      <Route path="/your-video" element={<><Header /> <YourVideoListsPage /></>} />
      <Route path="/add/video" element={<> <Header />
      <VideoFormPage /></>} />
      <Route path="*" element={<NoPage />} />
      <Route path="/protected" component={Protected} />
    </Routes>
  );
};

const Protected = () => {
  const accessToken = localStorage.getItem('access_token');
  
  if (!accessToken) {
      return <div>Access Denied. Please login first.</div>;
  }

  return <div>Protected Content</div>;
};

export default AppRoute;
