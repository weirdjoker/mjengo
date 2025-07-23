import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSelector from "./DashboardSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <img src="/assets/logo.png" alt="" className="h-8 mr-2" /> Mjengo
        </h1>
        <nav className="hidden md:flex space-x-6 items-center">
          <button onClick={() => scrollToSection("testimonials")} className="hover:text-gray-300 transition duration-200">Testimonials</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-gray-300 transition duration-200">About us</button>
          <button onClick={() => scrollToSection("technologies")} className="hover:text-gray-300 transition duration-200">Technologies</button>
          {!user && (
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Login
            </Link>
          )}
          {user && (
            <div className="ml-4">
              <DashboardSelector />
            </div>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700 px-4 py-2 space-y-2">
          <button onClick={() => scrollToSection("testimonials")} className="block py-2 hover:text-gray-300 transition duration-200">Testimonials</button>
          <button onClick={() => scrollToSection("about")} className="block py-2 hover:text-gray-300 transition duration-200">About us</button>
          <button onClick={() => scrollToSection("technologies")} className="block py-2 hover:text-gray-300 transition duration-200">Technologies</button>
          {!user && (
            <Link to="/login" className="block py-2 text-blue-300 hover:text-blue-400 transition duration-200">
              Login
            </Link>
          )}
          {user && (
            <div className="mt-2">
              <DashboardSelector />
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;