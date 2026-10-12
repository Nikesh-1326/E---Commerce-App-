import React, { useState } from "react";
import "./App.css";

function App() {
  // ---------------- PRODUCTS ----------------
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      category: "Mobile",
      price: 69999,
      image: "https://via.placeholder.com/300?text=iPhone+15",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      category: "Mobile",
      price: 74999,
      image: "https://via.placeholder.com/300?text=Samsung+S24",
    },
    {
      id: 3,
      name: "OnePlus 12",
      category: "Mobile",
      price: 59999,
      image: "https://via.placeholder.com/300?text=OnePlus+12",
    },
    {
      id: 4,
      name: "Sony Headphones",
      category: "Headphones",
      price: 4999,
      image: "https://via.placeholder.com/300?text=Sony+Headphones",
    },
  ];

  // ---------------- STATES ----------------

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState("home");

  const [order, setOrder] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ---------------- SEARCH ----------------

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- ADD TO CART ----------------

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    alert(`${product.name} added to cart!`);
  };

  // ---------------- INCREMENT ----------------

  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ---------------- DECREMENT ----------------

  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ---------------- REMOVE ----------------

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ---------------- TOTAL ----------------

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;

  const total = subtotal + delivery;

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ---------------- PLACE ORDER ----------------

  const placeOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderId =
      "ORD" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const newOrder = {
      orderId: orderId,
      customer: customer,
      items: cart,
      total: total,
    };

    setOrder(newOrder);

    // Clear cart
    setCart([]);

    // Go to success page
    setPage("success");
  };

  // =====================================================
  // PRODUCT CARD
  // =====================================================

  const ProductCard = ({ product }) => {
    return (
      <div className="product-card">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="product-info">

          <h3>{product.name}</h3>

          <p className="category">
            {product.category}
          </p>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <div className="product-buttons">

            <button
              className="cart-btn"
              onClick={() =>
                addToCart(product)
              }
            >
              🛒 Add to Cart
            </button>

            <button
              className="order-btn"
              onClick={() => {
                addToCart(product);
                setPage("cart");
              }}
            >
              ⚡ Order Now
            </button>

          </div>

        </div>

      </div>
    );
  };

  // =====================================================
  // CART ITEM
  // =====================================================

  const CartItem = ({ item }) => {
    return (
      <div className="cart-item">

        <img
          src={item.image}
          alt={item.name}
        />

        <div className="cart-item-info">

          <h3>{item.name}</h3>

          <p>
            ₹{item.price.toLocaleString("en-IN")}
          </p>

          <div className="quantity">

            <button
              onClick={() =>
                decrement(item.id)
              }
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                increment(item.id)
              }
            >
              +
            </button>

          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeItem(item.id)
            }
          >
            🗑 Remove
          </button>

        </div>

        <div className="item-total">

          ₹
          {(
            item.price * item.quantity
          ).toLocaleString("en-IN")}

        </div>

      </div>
    );
  };

  // =====================================================
  // CART
  // =====================================================

  const Cart = () => {
    return (
      <div className="page">

        <h1>🛒 Shopping Cart</h1>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h2>Your cart is empty</h2>

            <button
              onClick={() => setPage("home")}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="cart-container">

            <div>

              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

            <div className="summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>

              <hr />

              <div className="summary-total">
                <strong>Total</strong>
                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  setPage("checkout")
                }
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>
    );
  };

  // =====================================================
  // CHECKOUT
  // =====================================================

  const Checkout = () => {
    const handleChange = (e) => {
      setCustomer({
        ...customer,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div className="page">

        <h1>Checkout</h1>

        <div className="checkout-container">

          <form
            className="checkout-form"
            onSubmit={placeOrder}
          >

            <h2>Delivery Details</h2>

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
              name="pincode"
              placeholder="Pincode"
              value={customer.pincode}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="place-order"
            >
              Place Order
            </button>

          </form>

          <div className="summary">

            <h2>Order Summary</h2>

            {cart.map((item) => (

              <div
                className="summary-row"
                key={item.id}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </span>

              </div>

            ))}

            <hr />

            <div className="summary-total">

              <strong>Total</strong>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        </div>

      </div>
    );
  };

  // =====================================================
  // ORDER SUCCESS
  // =====================================================

  const OrderSuccess = () => {
    return (
      <div className="success-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Successful!
          </h1>

          <p>
            🎉 Thank you for your purchase.
          </p>

          {order && (

            <div className="order-details">

              <p>
                <strong>
                  Order ID:
                </strong>{" "}
                {order.orderId}
              </p>

              <p>
                <strong>
                  Total Amount:
                </strong>{" "}
                ₹
                {order.total.toLocaleString(
                  "en-IN"
                )}
              </p>

              <p>
                Your order will be delivered
                soon.
              </p>

            </div>

          )}

          <button
            onClick={() => setPage("home")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  };

  // =====================================================
  // FOOTER
  // =====================================================

  const Footer = () => {
    return (
      <footer>

        <div className="footer-container">

          <div>
            <h2>🛒 ShopEasy</h2>
            <p>
              Your trusted online shopping
              destination.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p>Home</p>
            <p>Products</p>
            <p>Orders</p>
            <p>Contact Us</p>
          </div>

          <div>
            <h3>Customer Service</h3>
            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>

          <div>
            <h3>Follow Us</h3>
            <p>📘 Facebook</p>
            <p>📷 Instagram</p>
            <p>🐦 Twitter</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 ShopEasy. All Rights Reserved.
        </div>

      </footer>
    );
  };

  // =====================================================
  // HOME
  // =====================================================

  const Home = () => {
    return (
      <div>

        <div className="hero">

          <h1>
            Welcome to ShopEasy
          </h1>

          <p>
            Find the best products at
            the best prices.
          </p>

        </div>

        <div className="page">

          <h1>Our Products</h1>

          <div className="search-container">

            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="product-list">

            {filteredProducts.length > 0 ? (

              filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )

            ) : (

              <h2>
                No products found
              </h2>

            )}

          </div>

        </div>

      </div>
    );
  };

  // =====================================================
  // NAVBAR
  // =====================================================

  const Navbar = () => {
    return (
      <nav className="navbar">

        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          🛒 ShopEasy
        </div>

        <div className="nav-links">

          <button
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            onClick={() => setPage("cart")}
          >
            🛒 Cart
            <span className="cart-count">
              {cartCount}
            </span>
          </button>

        </div>

      </nav>
    );
  };

  // =====================================================
  // MAIN RETURN
  // =====================================================

  return (
    <>

      <Navbar />

      {page === "home" && <Home />}

      {page === "cart" && <Cart />}

      {page === "checkout" && (
        <Checkout />
      )}

      {page === "success" && (
        <OrderSuccess />
      )}

      <Footer />

    </>
  );
}

export default App; cdd