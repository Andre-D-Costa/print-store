import React from "react";

import "../styles/dashboard.css";

export default function Category({ name }) {
  return <a class="category__name">{name}</a>;
}
