import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/Footer";
import "./Assets/Css/HeaderFooter.css";
import AppRoute from "./router";
import { useLocation } from "react-router-dom";

function App() {
  // const location = useLocation(); , '/login', '/logout'
  const hideFooter = ["/videos"].includes(window.location.pathname);
  // const hideHeader = ['/'].includes(window.location.pathname);
  // const hideFooter = false;

  return (
    <>
      
      <AppRoute />
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
