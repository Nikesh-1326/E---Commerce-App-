import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({
  cartItems,
  onOrderPlaced
}) {

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;

  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderId =
      "ORD" + Math.floor(100000 + Math.random() * 900000);

    const order = {
      orderId,
      customer,
      items: cartItems,
      total,
      date: new Date().toLocaleString()
    };

    // Send order to parent
    onOrderPlaced(order);

    // Go to success page
    navigate("/order-success");

  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Customer Form */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Delivery Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={customer.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={customer.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={customer.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={customer.state}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={customer.pincode}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Place Order
          </button>

        </form>

        {/* Order Summary */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{(
                  item.price * item.quantity
                ).toLocaleString("en-IN")}
              </span>

            </div>

          ))}

          <hr />

          <div className="checkout-total">

            <span>Total</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;