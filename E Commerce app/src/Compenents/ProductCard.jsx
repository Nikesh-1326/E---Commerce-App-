import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart, onOrderNow }) {
  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="product-details">

        <h3>{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-description">
          {product.description}
        </p>

        {/* Rating */}
        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        {/* Price */}
        <div className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        {/* Stock */}
        {product.stock > 0 ? (
          <p className="in-stock">
            In Stock ({product.stock})
          </p>
        ) : (
          <p className="out-stock">
            Out of Stock
          </p>
        )}

        {/* Buttons */}
        <div className="product-buttons">

          <button
            className="cart-btn"
            disabled={product.stock === 0}
            onClick={() => onAddToCart(product)}
          >
            🛒 Add to Cart
          </button>

          <button
            className="order-btn"
            disabled={product.stock === 0}
            onClick={() => onOrderNow(product)}
          >
            ⚡ Order Now
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;