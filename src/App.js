
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './App.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RythuBazar from "./pages/RythuBazar";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rythu-bazar" element={<RythuBazar />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
