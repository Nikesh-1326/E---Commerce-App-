import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, onAddToCart, onOrderNow }) {

  return (
    <div className="product-list">

      {products.length > 0 ? (

        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onOrderNow={onOrderNow}
          />
        ))

      ) : (

        <div className="no-products">
          <h2>No Products Found</h2>
          <p>Try searching for another product.</p>
        </div>

      )}

    </div>
  );
}

export default ProductList;