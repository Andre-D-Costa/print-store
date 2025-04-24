import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Category from "../../components/Category.jsx";
import { getCategories } from "../../services/categories.js";

import "../../styles/dashboard.css";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <>
      <section class="categories__mainContainer">
        {categories.length === 0 ? (
          <div class="dashboard__loadingSpinner">
            <div class="dashboard__logoSpinnerContainer--1">
              <div class="dashboard__logoSpinnerContainer--2">
                <div class="dashboard__logoSpinnerContainer--3"></div>
              </div>
            </div>
          </div>
        ) : (
          <section class="categories__mainContainer">
            <div
              onClick={() => navigate("/products")}
              class="categories__container"
            >
              <div class="categories__imagesContainer">
                <img
                  class="categories__image"
                  src="https://i.imgur.com/nxhjuNC.png"
                  alt="Kicks section"
                />
                <img
                  class="categories__image"
                  src="https://i.imgur.com/autdNye.png"
                  alt="Artwork section"
                />
                <img
                  class="categories__image"
                  src="https://artisanhd.com/wp-content/uploads/2017/05/canvascorner4.jpg"
                  alt="Prints section"
                />
                <img
                  class="categories__image"
                  src="https://render.fineartamerica.com/images/images-clothing-body-styles/23-5.png"
                  alt="Merch section"
                />
              </div>
              <div class="categories__namesContainer">
                {categories.map((category, key) => (
                  <Category
                    class="category__name"
                    key={`category-key-${category._id}-${key}`}
                    name={category.name}
                    description={category.description}
                    slug={category.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
