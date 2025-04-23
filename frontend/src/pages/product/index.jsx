import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getProductsBySlug } from "../../services/products.js";
import { CartContext } from "../../context/cart.jsx";

import "../../styles/eachProduct.css";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  // const navigate = useNavigate();
  const handlePurchase = () => {
    addToCart(product);
  };

  useEffect(() => {
    getProductsBySlug(slug).then((res) => {
      setProduct(res);
    });
  }, [slug]);
  // if (!product) {
  //   return <p>Loading...</p>;
  // }

  return (
    <section class="products__section">
      {product ? (
        <div class="eachProduct__container">
          <img
            alt="product"
            class="eachProduct__image"
            src={product.images[0]}
          />
          <div class="eachProduct__info">
            <div class="eachProduct__details">
              <h2 class="eachProduct__category">{product.category.name}</h2>
              <h1 class="eachProduct__title">{product.name}</h1>
              <p class="eachProduct__desc">{product.description}</p>
              <span class="eachProduct__price">€{product.price}</span>
              <button
                onClick={handlePurchase}
                class="eachProduct__addBtn"
                title="Add to cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div class="eachProduct__container--loading">
          <span class="eachProduct__image--loading"></span>
          <div class="eachProduct__info--loading">
            <div class="eachProduct__details--loading">
              <h2 class="eachProduct__category--loading"></h2>
              <h1 class="eachProduct__title--loading"></h1>
              <p class="eachProduct__desc--loading"></p>
            </div>
            <div class="eachProduct__buySetup--loading">
              <span class="eachProduct__price--loading"></span>
              <button
                class="eachProduct__addBtn--loading"
                title="Add to cart--loading"
              ></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
