import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, User } from "lucide-react";
import "./Navbar.css";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Transactions", link: "/transactions" },
    { name: "Goals", link: "/goals" },
    { name: "Reports", link: "/reports" },
    { name: "Profile", link: "/profile" },
  ];

  return (
    <nav className={`navbar ${darkMode ? "dark-navbar" : "light-navbar"}`}>
      <div className="navbar-container">
        
        {/* Left - Brand */}
        <div className="navbar-left" onClick={() => navigate("/")}>
          <h1 className="brand">Finance Tracker</h1>
        </div>

        {/* Center - Navigation Links */}
        <div className="navbar-center">
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.link} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Dark Mode Toggle & User Icon */}
        <div className="navbar-right">
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/profile" className="user-link">
    <User size={28} className="user-icon" />
  </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
