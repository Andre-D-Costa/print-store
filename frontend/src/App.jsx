import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProductsPage from "./pages/index.jsx";
import ProductDetails from "./pages/product/index.jsx";
import RegistrationPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
// import AuthContextProvider from "./context/auth.jsx";

export default function App() {
  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </AuthContextProvider>
  );
}
