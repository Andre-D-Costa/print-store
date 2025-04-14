import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/products.js";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);
  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {products.length === 0 ? (
          <p>No products available at the moment. Please check again later.</p>
        ) : (
          <div className="flex flex-wrap -m-4">
            {products.map((product, key) => (
              <Product key={`${product.id}-${key}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
