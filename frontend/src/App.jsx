import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProductsPage from "./pages/index.jsx";
import ProductDetails from "./pages/product/index.jsx";
import RegistrationPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import AccountPage from "./pages/account/index.jsx";
import PasswordPage from "./pages/password/index.jsx";
import DashboardPage from "./pages/dashboard/index.jsx";
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
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/password" element={<PasswordPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
