import React from "react";
import "./Footer.css";

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}

        <div className="footer-section">

          <h2>🛒 ShopEasy</h2>

          <p>
            Your trusted online shopping destination.
            Shop easily, quickly and securely.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>

        </div>

        {/* Customer Service */}

        <div className="footer-section">

          <h3>Customer Service</h3>

          <a href="/">Contact Us</a>
          <a href="/">Help Center</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>

        </div>

        {/* Social */}

        <div className="footer-section">

          <h3>Follow Us</h3>

          <div className="social-links">

            <span>📘 Facebook</span>
            <span>📷 Instagram</span>
            <span>🐦 Twitter</span>
            <span>▶️ YouTube</span>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 ShopEasy. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;