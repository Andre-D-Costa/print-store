import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/products.js";
import "../styles/products.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <section class="products__mainContainer">
      <div>
        {products.length === 0 ? (
          <div class="dashboard__loadingSpinner">
            <div class="dashboard__logoSpinnerContainer--1">
              <div class="dashboard__logoSpinnerContainer--2">
                <div class="dashboard__logoSpinnerContainer--3"></div>
              </div>
            </div>
          </div>
        ) : (
          <div class="products__container">
            {products.map((product, key) => (
              <Product
                key={`${product._id}-${key}`}
                name={product.name}
                images={product.images}
                category={product.category}
                price={`€${product.price}`}
                slug={product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
