import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/auth";
import { AuthContext } from "../../context/auth";

import "../../styles/register.css";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(name, email, password);
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
      <div class="register__mainContainer">
        <section alt="André D. Costa Store" class="register__siteName--face">
          <div>
            <div class="logoContainerRegister__1">
              <div class="logoContainerRegister__2">
                <div class="logoContainerRegister__3"></div>
              </div>
            </div>
          </div>
          <h2 class="register__siteName--text">Create a new account</h2>
          <p class="register__text">
            Are you already with us?
            <a
              onClick={() => {
                navigate("/login");
              }}
              class="register__textLink"
            >
              Let's go then
            </a>
          </p>
        </section>
        <div class="register__formContainer">
          <form onSubmit={handleSubmit} class="register__form">
            <div class="register__nameContainer">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                required
                class="register__nameInput"
              />
              <label htmlFor="name" class="register__text">
                Name
              </label>
            </div>

            <div class="register__emailContainer">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                // autoComplete="current-email"
                class="register__emailInput"
              />
              <label htmlFor="email" class="register__text">
                Email
              </label>
            </div>

            <div class="register__passwordContainer">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                class="register__passwordInput"
              />
              <label htmlFor="password" class="register__text">
                Password
              </label>
            </div>

            <div>
              <button type="submit" class="register__submitButton">
                Start
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
