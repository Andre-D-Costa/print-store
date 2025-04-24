import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Minus, Plus } from "lucide-react";
import { CartContext } from "../context/cart";

import "../styles/cart.css";
import "../styles/eachCartProduct.css";

export default function CartProduct({ product }) {
  const navigate = useNavigate();
  const { addToCart, removeOneFromCart, removeAllFromCart } =
    useContext(CartContext);

  return (
    <div class="cart__list">
      <img
        onClick={() => navigate(`/products/${product.slug}`)}
        src={product.images[0]}
        alt={product.name}
        class="cart__itemImage"
      />
      <div class="cart__itemDetails">
        <h3
          class="cart__itemName"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.name}
        </h3>
        <h3 class="cart__itemPrice">€{product.price.toFixed(2)}</h3>
        <div class="cart__btnsContainer">
          <button class="cart__plusBtn" onClick={() => addToCart(product)}>
            <Plus />
          </button>
          <span class="cart__itemQtty">{product.quantity}</span>
          <button
            class="cart__minusBtn"
            onClick={() => removeOneFromCart(product)}
          >
            <Minus />
          </button>
          <button
            class="cart__removeBtn"
            onClick={() => removeAllFromCart(product)}
          >
            Remove
          </button>
        </div>
        <h3 class="cart__itemTotal">
          €{(product.price * product.quantity).toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
