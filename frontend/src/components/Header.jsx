import React, { useState, useEffect } from "react";
import Category from "./Category";
import { getCategories } from "../services/categories.js";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

import "../styles/header.css";

export default function Header() {
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
            onClick={() => navigate("/login")}
            title="See you soon!"
            class="header__cartBtnLogout"
          >
            <LogOut />
          </button>
          <button
            title="Adjust your account's settings"
            class="header__cartBtn"
          >
            <User />
          </button>
          <button title="Take a look at your wishlist" class="header__cartBtn">
            <Heart />
          </button>
          <button
            title="Confirm your shopping cart's content"
            class="header__cartBtn"
          >
            <ShoppingCart />
            <sup class="header__cartQtty">32</sup>
          </button>
        </div>
      </div>
    </header>
  );
}
