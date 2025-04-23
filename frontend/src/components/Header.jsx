import React, { useState, useEffect, useContext } from "react";
import Category from "./Category";
import { User, Heart, LogOut, ShoppingCart } from "lucide-react";
import { getCategories } from "../services/categories.js";
import { useNavigate } from "react-router";
import { CartContext } from "../context/cart.jsx";

import "../styles/header.css";

export default function Header() {
  const { quantity } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <header>
      <div class="header__mainContainer">
        <section class="header__siteName" onClick={() => navigate("/")}>
          <div class="logoContainer__1"></div>
          <div class="logoContainer__2"></div>
          <div class="logoContainer__3"></div>
          <h2 class="header__siteName--text">André Costa</h2>
        </section>
        <nav class="mainContainer__navbar--desktop--link">
          {categories.map((category, key) => (
            <Category
              class="header__linkBtn"
              key={`category-key-${category.id}-${key}`}
              name={category.name}
            />
          ))}
        </nav>
        <div class="header__btnsContainer">
          {/* <button title="Go to your profile" class="header__cartBtn plusIcon">
            +
          </button> */}
          <button
            title="See you soon!"
            class="header__cartBtnLogout"
            onClick={() => navigate("/login")}
          >
            <LogOut />
          </button>
          <button
            title="Adjust your account's settings"
            class="header__cartBtn"
            onClick={() => navigate("/login")}
          >
            <User />
          </button>
          <button title="Take a look at your wishlist" class="header__cartBtn">
            <Heart />
          </button>
          <button
            onClick={() => navigate("/cart")}
            title="Confirm your shopping cart's content"
            class="header__cartBtn"
          >
            <ShoppingCart />
            <sup class="header__cartQtty">{quantity}</sup>
          </button>
        </div>
      </div>
    </header>
  );
}
