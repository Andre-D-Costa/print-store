import React, { useState, useEffect } from "react";
import Category from "./Category";
import { getCategories } from "../services/categories.js";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            cursor={"pointer"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Print Store</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {categories.map((category, key) => (
            <Category
              key={`category-key-${category.id}-${key}`}
              name={category.name}
            />
          ))}
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <ShoppingCart />
          <sup className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-indigo-500 text-white cursor-pointer">
            0
          </sup>
        </button>
      </div>
    </header>
  );
}
