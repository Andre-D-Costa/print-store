import React from "react";
// import { useCartContext } from "../context/CartContext";
import "../styles/products.css";

export default function Product({ name, images, category, price }) {
  // const { addCart } = useCartContext();

  return (
    <>
      <div class="product__individualContainer">
        <img alt={name} class="product__image" src={images[0]} />
        <div class="product__info">
          <h3 class="product__category">{category.name}</h3>
          <h2 class="product__name">{name}</h2>
          <p class="product__price">{price}</p>
          {/* <button
            onClick={() => {
              addCart(product);
            }}
            class="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition cursor-pointer"
          >
            Add to Cart
          </button> */}
        </div>
      </div>
    </>
  );
}
