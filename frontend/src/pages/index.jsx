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
  // if (!products) {
  //   return <p>Loading...</p>;
  // }

  return (
    <section class="products__mainContainer">
      <div>
        {products.length === 0 ? (
          <p class="products__emptyContainer">
            No products available at the moment. Please check again later.
          </p>
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
