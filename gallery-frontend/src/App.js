import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/Footer";
import "./Assets/Css/HeaderFooter.css";
import AppRoute from "./router";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "./services/auth";


function App() {
  // const location = useLocation(); , '/login', '/logout'
  const hideFooter = ["/videos"].includes(window.location.pathname);
  // const hideHeader = ['/'].includes(window.location.pathname);
  // const hideFooter = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/videos");
      return;
    }
  }, [navigate]);

  return (
    <>
      <AppRoute />
      {/* {!hideFooter && <Footer />} */}
      <Footer />
    </>
  );
}

export default App;
