import React from "react";
// import { useCartContext } from "../context/CartContext";

export default function Product({ name, images, category, price }) {
  // const { addCart } = useCartContext();

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt={name}
            className="object-cover object-center w-full h-full block"
            src={images?.[0] ?? ""}
          />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category?.name ?? ""}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {name}
          </h2>
          <p className="mt-1">{price}</p>
          {/* <button
            onClick={() => {
              addCart(product);
            }}
            className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition cursor-pointer"
          >
            Add to Cart
          </button> */}
        </div>
      </div>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full"></div>
    </>
  );
}
