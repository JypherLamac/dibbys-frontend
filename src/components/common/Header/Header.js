// src/components/common/Header/Header.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();
  const location = useLocation();
  
  const { isAuthenticated, user, cart, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    handleLinkClick();
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const getUserFirstName = () => {
    if (!user) return "";
    if (user.name) {
      return user.name.split(' ')[0];
    }
    return "User";
  };

  return (
    <header className="header">
      <div className="header-container" ref={navRef}>
        <Link to="/" className="logo-link">
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
            
            {/* Mobile-only user section WITH CART IN DROPDOWN */}
            <li className="nav-item mobile-only">
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <span className="mobile-user-name">Hi, {getUserFirstName()}</span>
                  </div>
                  {/* Cart in Mobile Dropdown Menu */}
                  <div className="mobile-cart-section">
                    <Link to="/cart" className="mobile-cart-link" onClick={handleLinkClick}>
                      <div className="mobile-cart-icon-container">
                        <img src="/images/Cart-Icon.png" alt="Cart" className="mobile-cart-image" />
                        {cart.itemCount > 0 && (
                          <span className="mobile-cart-badge">{cart.itemCount}</span>
                        )}
                      </div>
                      <span className="mobile-cart-text">My Cart</span>
                    </Link>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="mobile-signin-btn"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="mobile-signin-btn"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Link>
                  {/* Cart in Mobile Dropdown Menu for non-logged in users */}
                  <div className="mobile-cart-section">
                    <Link to="/cart" className="mobile-cart-link" onClick={handleLinkClick}>
                      <div className="mobile-cart-icon-container">
                        <img src="/images/Cart-Icon.png" alt="Cart" className="mobile-cart-image" />
                        {cart.itemCount > 0 && (
                          <span className="mobile-cart-badge">{cart.itemCount}</span>
                        )}
                      </div>
                      <span className="mobile-cart-text">My Cart</span>
                    </Link>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Cart Button - Desktop only (HIDDEN ON MOBILE) */}
          <Link to="/cart" className="btn-cart desktop-only-cart">
            <div className="cart-icon-container">
              <img 
                src="/images/Cart-Icon.png" 
                alt="Cart" 
                className="cart-image" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <svg class="cart-svg" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  `;
                }}
              />
            </div>
            
            {cart.itemCount > 0 && (
              <span className="cart-badge">{cart.itemCount}</span>
            )}
          </Link>
          
          {/* Desktop User Actions */}
          {isAuthenticated ? (
            <div className="desktop-user-section">
              <span className="desktop-user-name">
                Hi, {getUserFirstName()}
              </span>
              <button 
                onClick={handleLogout}
                className="btn-signin btn-logout"
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