import React from "react";

export default function Category({ name }) {
  return (
    <a href="#" className="mr-5 hover:text-gray-900">
      {name}
    </a>
  );
}
