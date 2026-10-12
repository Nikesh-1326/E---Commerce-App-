import React from "react";
import "./CartItem.css";

function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove
}) {
  return (
    <div className="cart-item">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      {/* Product Details */}
      <div className="cart-item-details">

        <h3>{item.name}</h3>

        <p className="cart-category">
          {item.category}
        </p>

        <p className="cart-price">
          ₹{item.price.toLocaleString("en-IN")}
        </p>

        {/* Quantity */}
        <div className="quantity-control">

          <button
            onClick={() => onDecrement(item.id)}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => onIncrement(item.id)}
          >
            +
          </button>

        </div>

        {/* Remove */}
        <button
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          🗑 Remove
        </button>

      </div>

      {/* Item Total */}
      <div className="item-total">

        <strong>
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </strong>

      </div>

    </div>
  );
}

export default CartItem;


   