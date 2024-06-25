import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/Footer";
import "./Assets/Css/HeaderFooter.css";
import AppRoute from "./router";
import { useLocation } from "react-router-dom";

function App() {
  // const location = useLocation(); , '/login', '/logout'
  // const hideHeaderFooter = ['/videos'].includes(window.location.pathname);
  const hideHeaderFooter = false;

  return (
    <>
      <Header />
      <AppRoute />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
