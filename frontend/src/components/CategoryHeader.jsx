import React from "react";

import "../styles/header.css";

export default function CategoryHeader({ name }) {
  return <a class="header__linkBtn">{name}</a>;
}
