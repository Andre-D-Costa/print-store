import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";
import { AuthContext } from "../../context/auth";

import "../../styles/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    handleLogin(response.accessToken);
    navigate("/account");
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/account");
    }
  }, [isLogged, navigate]);

  return (
    <>
      <div class="login__mainContainer">
        <section alt="André D. Costa Store" class="login__siteName--face">
          <div>
            <div class="logoContainerLogin__1">
              <div class="logoContainerLogin__2">
                <div class="logoContainerLogin__3"></div>
              </div>
            </div>
          </div>
          <h2 class="login__siteName--text">Welcome back!</h2>
        </section>

        <div class="login__formContainer">
          <form onSubmit={handleSubmit} class="login__form">
            <div class="login__emailContainer">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="current_email"
                class="login__emailInput"
              />
              <label htmlFor="email" class="login__text">
                Email
              </label>
            </div>

            <div class="login__passwordContainer">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                class="login__passwordInput"
              />
              <label htmlFor="password" class="login__text">
                Password
              </label>
              <a class="login__textLink">Did you forget it?</a>
            </div>

            <div>
              <button type="submit" class="login__submitButton">
                Login
              </button>
            </div>
          </form>
        </div>
        <div class="login__createContainer">
          <p class="login__text">Not yet with us?</p>

          <a
            onClick={() => {
              navigate("/register");
            }}
            class="login__textLink"
          >
            Create account
          </a>
        </div>
      </div>
    </>
  );
}
