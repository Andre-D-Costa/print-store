import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProductsPage from "./pages/index.jsx";
import ProductDetails from "./pages/product/index.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
