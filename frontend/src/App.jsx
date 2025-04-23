import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProductsPage from "./pages/index.jsx";
import ProductDetails from "./pages/product/index.jsx";
import RegistrationPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import AccountPage from "./pages/account/index.jsx";
import CartPage from "./pages/cart/index.jsx";
import AuthContextProvider from "./context/auth.jsx";
import CartContextProvider from "./context/cart.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
