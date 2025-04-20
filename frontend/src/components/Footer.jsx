import React from "react";

import "../styles/footer.css";

export default function Footer() {
  return (
    <footer class="footer__mainContainer">
      <p class="footer__text">© 2025 | All rights reserved</p>
      <div className="footer__linksContainer">
        <a class="footer__text footer__textLink">Policy</a>
        <a class="footer__text footer__textLink">Returns</a>
        <a class="footer__text footer__textLink">Give us your feedback</a>
      </div>
    </footer>
  );
}
