import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Fauna from "./pages/Fauna";
import Flora from "./pages/Flora";
import Gastronomia from "./pages/Gastronomia";
import Galeria from "./pages/Galeria";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/fauna" element={<Fauna />} />
        <Route path="/flora" element={<Flora />} />
        <Route path="/gastronomia" element={<Gastronomia />} />
        <Route path="/galeria" element={<Galeria />} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;