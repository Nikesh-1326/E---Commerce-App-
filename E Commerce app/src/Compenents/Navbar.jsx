import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      console.log("Searching for:", search);
    }
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          🛒 ShopEasy
        </Link>
      </div>

      {/* Search Bar */}
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          🔍
        </button>
      </form>

      {/* Mobile Menu Button */}
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/products" onClick={() => setMenuOpen(false)}>
          Products
        </Link>

        <Link to="/orders" onClick={() => setMenuOpen(false)}>
          Orders
        </Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-count">
            {cartCount}
          </span>
        </Link>

        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="login-btn"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;