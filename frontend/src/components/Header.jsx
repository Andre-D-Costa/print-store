import React, { useState, useEffect, useContext } from "react";
import CategoryHeader from "./CategoryHeader.jsx";
import {
  User,
  Heart,
  LogOut,
  ShoppingCart,
  ShoppingBasket,
} from "lucide-react";
import { getCategories } from "../services/categories.js";
import { useNavigate } from "react-router";
import { CartContext } from "../context/cart.jsx";
import { AuthContext } from "../context/auth.jsx";

import "../styles/header.css";

export default function Header() {
  const { handleLogout, isLogged } = useContext(AuthContext);
  const { quantity } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  if (!isLogged) {
    return (
      <header>
        <div class="header__mainContainer">
          <section
            class="header__siteName"
            onClick={() => navigate("/dashboard")}
          >
            <div class="logoContainer__1"></div>
            <div class="logoContainer__2"></div>
            <div class="logoContainer__3"></div>
            <h2 class="header__siteName--text">SCAM</h2>
          </section>
          <div class="header__btnsContainerAnon">
            <button
              title="Login/Check your account's settings"
              class="header__cartBtnAnon"
              onClick={() => navigate("/account")}
            >
              <User />
            </button>
            <button
              onClick={() => navigate("/cart")}
              title="You're shopping anonymously"
              class="header__cartBtn"
            >
              <ShoppingBasket />
              <sup class="header__cartQttyAnon">{quantity}</sup>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div class="header__mainContainer">
        <section
          class="header__siteName"
          onClick={() => navigate("/dashboard")}
        >
          <div class="logoContainer__1"></div>
          <div class="logoContainer__2"></div>
          <div class="logoContainer__3"></div>
          <h2 class="header__siteName--text">SCAM</h2>
        </section>
        <nav class="mainContainer__navbar--desktop--link">
          {categories.map((category, key) => (
            <CategoryHeader
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
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
          >
            <LogOut />
          </button>
          <button
            title="Adjust your account's settings"
            class="header__cartBtn"
            onClick={() => navigate("/account")}
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
