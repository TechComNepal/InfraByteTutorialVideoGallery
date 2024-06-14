import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from "./Pages/Homepage";
import Footer from "./Components/Footer";
import './Assets/Css/HeaderFooter.css';
import { BrowserRouter as Routher, Routes, Route } from 'react-router-dom';
function App() {
  return (
    < className='App'>
      <Routher>
      <Routes>
      <Route path="/Homepage" element={<Homepage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </Routher>
    </>
    <>
        <Header />
        <Homepage />
        <Footer />
      </>
  );
}

export default App;
