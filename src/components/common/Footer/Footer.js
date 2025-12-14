// src/components/common/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-container">
            <div className="footerlogo">
              <img src="/images/footerlogo.png" alt="Dibby's Wings Logo" />
            </div>
            <div className="brand-name">Dibby's Wings</div>
          </div>
          <p>Serving the best unlimited chicken wings in Taguig City since 2020. Fresh, crispy, and delicious!</p>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61556888055954"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61556888055954"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61556888055954"><i className="fab fa-twitter"></i></a>
            <a href="https://www.tiktok.com/@nitramzzz?lang=en"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
  <li>
    <Link to="/Home">
      <i className="fas fa-home"></i> Home
    </Link>
  </li>
  <li>
    <Link to="/Menu">
      <i className="fas fa-utensils"></i> Menu
    </Link>
  </li>
  <li>
    <Link to="/Cart">
      <i className="fas fa-shopping-cart"></i> Order Now
    </Link>
  </li>
  <li>
    <Link to="/About">
      <i className="fas fa-info-circle"></i> About Us
    </Link>
  </li>
</ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <i className="fas fa-map-marker-alt"></i>
            <p>58 M.L. Quezon St. New Lower Bicutan , Taguig, Philippines</p>
          </div>
          <div className="contact-info">
            <i className="fas fa-phone"></i>
            <p>+63 912 345 6789</p>
          </div>
          <div className="contact-info">
            <i className="fas fa-envelope"></i>
            <p>dibbysresto@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <table className="hours-table">
            <tbody><tr>
              <td>Monday - Friday</td>
              <td>12PM - 10PM</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>12PM - 10PM</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>12PM - 10PM</td>
            </tr></tbody>
          </table>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">
          <p>© 2024 Dibby's Wings. All rights reserved.</p>
        </div>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Website Builder</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;