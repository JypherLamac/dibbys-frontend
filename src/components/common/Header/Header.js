// src/components/common/Header/Header.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

// Paths from public folder (no need for imports, use direct paths)
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();
  const location = useLocation();
  
  // Use Auth context
  const { isAuthenticated, user, cart, logout } = useAuth();

  // Navigation links with their routes
  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/feedback", name: "Feedback" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    handleLinkClick(); // Close menu if open
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container" ref={navRef}>
        <Link to="/" className="logo-link">
          {/* Direct path to public/images */}
          <img src="/images/logo.png" alt="Dibby's Restaurant Logo" className="logo" />
        </Link>

        <nav>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            
            {/* Mobile-only buttons */}
            <li className="nav-item mobile-only">
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <span className="user-name" style={{color: '#333', padding: '10px', display: 'block'}}>
                    Hi, {user?.name?.split(' ')[0]}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="mobile-signin-btn"
                    style={{background: '#f39c12', color: 'white', border: 'none', width: '100%', padding: '12px', borderRadius: '6px', cursor: 'pointer'}}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="mobile-signin-btn"
                  onClick={handleLinkClick}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Cart Button */}
          <Link to="/cart" className="btn-cart">
            {/* Direct path to public/images */}
            <img src="/images/Cart-Icon.png" alt="Cart" />
            
            {/* Show cart count badge if items in cart */}
            {cart.itemCount > 0 && (
              <span className="cart-badge">{cart.itemCount}</span>
            )}
          </Link>
          
          {/* Desktop Sign In/User Actions */}
          {isAuthenticated ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <span style={{color: 'white', fontSize: '14px'}}>
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="btn-signin"
                style={{background: '#f39c12', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600'}}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-signin">
              Sign In
            </Link>
          )}
        </div>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;