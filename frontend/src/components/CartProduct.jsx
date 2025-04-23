import React from "react";
import { useNavigate } from "react-router";
import { Minus, Plus } from "lucide-react";

import "../styles/cart.css";
import "../styles/eachCartProduct.css";

export default function CartProduct({ product }) {
  const navigate = useNavigate();

  return (
    <div class="cart__mainContainer">
      {product.length === 0 ? (
        <>
          <div class="cart__shoppingBagIcon">
            <ShoppingBag />
          </div>
          <p class="cart__emptyText">
            Your shopping bag is empty at the moment. Take a look at our{" "}
            <a
              class="cart__emptyProducts"
              onClick={() => {
                navigate("/");
              }}
            >
              products.
            </a>
          </p>
        </>
      ) : (
        <>
          <div class="cart__list">
            <img
              onClick={() => navigate(`/products/${product.id}`)}
              src={product.images[0]}
              alt={product.name}
              class="cart__itemImage"
            />
            <div class="cart__itemDetails">
              <h3
                class="cart__itemName"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.name}
              </h3>
              <h3 class="cart__itemPrice">€{product.price.toFixed(2)}</h3>
              <div class="cart__btnsContainer">
                <button class="cart__plusBtn">
                  <Plus />
                </button>
                <span class="cart__itemQtty">{product.quantity}</span>
                <button class="cart__minusBtn">
                  <Minus />
                </button>
                <button class="cart__removeBtn">Remove</button>
              </div>
              <h3 class="cart__itemTotal">
                €{(product.price * product.quantity).toFixed(2)}{" "}
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
