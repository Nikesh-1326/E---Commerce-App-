import React from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove
}) {

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;

  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      <h1>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart first.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="cart-container">

          {/* Cart Items */}

          <div className="cart-items">

            {cartItems.map((item) => (

              <CartItem
                key={item.id}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />

            ))}

          </div>

          {/* Summary */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>
                ₹{deliveryCharge}
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;