import React from "react";
import { useNavigate } from "react-router";

import "../../styles/reset.css";

export default function PasswordPage() {
  const navigate = useNavigate();

  return (
    <div class="reset__mainContainer">
      <section alt="André D. Costa Store" class="reset__siteName--face">
        <div>
          <div class="logoContainerReset__1">
            <div class="logoContainerReset__2">
              <div class="logoContainerReset__3"></div>
            </div>
          </div>
        </div>
        <h2 class="reset__siteName--text">Reset your password</h2>
      </section>

      <div>
        <form class="reset__formContainer">
          <div class="reset__passwordsContainer">
            <input
              // value={password}
              id="oldPassword"
              name="oldPassword"
              type="password"
              required
              class="reset__oldInput"
            />
            <label htmlFor="oldPassword" class="reset__text">
              Old
            </label>
          </div>
          <div>
            <button type="submit" class="reset__submitButton">
              Reset
            </button>
          </div>
          <div class="reset__passwordsContainer">
            <input
              // value={password}
              id="newPassword"
              name="newPassword"
              type="password"
              required
              class="reset__newInput"
            />
            <label htmlFor="newPassword" class="reset__text">
              New
            </label>
          </div>
          <div class="reset__passwordsContainer">
            <input
              // value={password}
              id="repeatNewPassword"
              name="repeatNewPassword"
              type="password"
              required
              class="reset__repeatNewInput"
            />
            <label htmlFor="repeatNewPassword" class="reset__text">
              Repeat
            </label>
          </div>

          <div>
            <button type="submit" class="reset__submitButton">
              Confirm
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate(-1)}
              type="submit"
              class="reset__submitButton"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
