import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProductsBySlug } from "../../services/products.js";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsBySlug(slug).then((res) => {
      setProduct(res);
    });
  }, [slug]);
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {product && (
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.images[0]}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>

              <p className="leading-relaxed">{product.description}</p>

              <div className="flex mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">
                  €{product.price}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
