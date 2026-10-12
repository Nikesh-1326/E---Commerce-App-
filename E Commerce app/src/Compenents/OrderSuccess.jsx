import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess({ order }) {

  const navigate = useNavigate();

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Successful!</h1>

        <p>
          🎉 Thank you for your purchase.
        </p>

        {order && (
          <>
            <p>
              Your order has been placed successfully.
            </p>

            <div className="order-info">

              <p>
                <strong>Order ID:</strong>{" "}
                {order.orderId}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ₹{order.total.toLocaleString("en-IN")}
              </p>

            </div>
          </>
        )}

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;