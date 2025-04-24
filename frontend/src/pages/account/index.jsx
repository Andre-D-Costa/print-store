import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router";

import "../../styles/account.css";

export default function AccountPage() {
  const { user, isLogged, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  if (!user) {
    return (
      <div class="account__mainContainer">
        <h1 class="account__sessExpText">
          Session expired. Login again{" "}
          <span class="account__sessExpTextLogin" onClick={() => navigate("/")}>
            here.
          </span>
        </h1>
      </div>
    );
  }

  if (user) {
    return (
      <div class="account__mainContainer">
        {user?.name ? (
          <div class="account__userText">Welcome {user.name}!</div>
        ) : (
          <div class="account__userText">Welcome!</div>
        )}
        <div class="account__userInfo">
          <div class="account__userInfoContainer">
            <h2 class="account__userSubText">Settings</h2>
            <h3 class="account__userSubSubText">Name: {user.name}</h3>
            <h3 class="account__userSubSubText">Email: {user.email}</h3>
            <h3 class="account__userSubSubText">Address:</h3>
            <h3 class="account__userSubSubText">Payment Methods:</h3>
            <br />
            <h3
              onClick={() => navigate("/password")}
              class="account__userSubSubSubText"
            >
              Change password
            </h3>
            <h3
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              class="account__userSubSubSubText"
            >
              Logout
            </h3>
          </div>
          <div class="account__userInfoContainer">
            <h2 class="account__userSubText">Your orders</h2>
            <div class="account__userOrdersList"></div>
          </div>
        </div>
      </div>
    );
  }
}
