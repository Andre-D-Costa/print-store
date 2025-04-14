import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages/index.jsx";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
