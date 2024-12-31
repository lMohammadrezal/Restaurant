// src/components/Header.js

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";


const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext); // Get theme and toggle function from context

  // Dynamic title logic
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/about":
        return ["About Us", "ABOUT"];
      case "/services":
        return ["Services", "SERVICE"];
      case "/menu":
        return ["Food Menu", "MENU"];
      case "/booking":
        return ["Booking", "BOOKING"];
      case "/team":
        return ["Our Team", "TEAM"];
      case "/testimonial":
        return ["Testimonial", "TESTIMONIAL"];
      case "/contact":
        return ["Contact Us", "CONTACT"];
      default:
        return ["Page Not Found", "NOT FOUND"];
    }
  };
  const PageText = getPageTitle();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Apply theme to body
  }, [theme]);

  // Navbar collapse toggle
  const toggleNavbar = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Sticky navbar effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="container-xxl position-relative p-0">
        <nav
          className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0 ${isSticky ? "sticky-top" : ""}`}
        >
          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-utensils me-3"></i>Restoran
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarCollapse"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
            id="navbarCollapse"
          >
            <div className="navbar-nav ms-auto py-0 pe-4">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/services" className="nav-item nav-link">
                Service
              </Link>
              <Link to="/menu" className="nav-item nav-link">
                Menu
              </Link>
              <div
                className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}
                onClick={toggleDropdown}
              >
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  aria-expanded={isDropdownOpen}
                >
                  Pages
                </span>
                <div
                  className={`dropdown-menu m-0 ${isDropdownOpen ? "show" : ""}`}
                >
                  <Link to="/booking" className="dropdown-item">
                    Booking
                  </Link>
                  <Link to="/team" className="dropdown-item">
                    Our Team
                  </Link>
                  <Link to="/testimonial" className="dropdown-item">
                    Testimonial
                  </Link>
                </div>
              </div>
              <Link to="/contact" className="nav-item nav-link">
                Contact
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <Link to="/booking" className="btn btn-primary py-2 px-4 me-3">
                Book A Table
              </Link>
              {/* Dark Mode Toggle */}
              <div className="theme-toggle">
                <button
                  className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                  onClick={toggleTheme}
                  title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                  {theme === "light" ? (
                    <i className="fas fa-moon"></i>
                  ) : (
                    <i className="fas fa-sun"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              {PageText[0]}
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  {PageText[1]}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
