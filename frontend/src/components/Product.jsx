import React from "react";
import { useNavigate } from "react-router";

import "../styles/products.css";

export default function Product({ name, images, category, price, slug }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        class="product__individualContainer"
        onClick={() => navigate(`/products/${slug}`)}
      >
        <img alt={name} class="product__image" src={images[0]} />
        <div class="product__info">
          <h3 class="product__category">{category.name}</h3>
          <h2 class="product__name">{name}</h2>
          <p class="product__price">{price}</p>
        </div>
      </div>
    </>
  );
}
