import { useContext } from "react";
import CartProduct from "../../components/CartProduct";
import { CartContext } from "../../context/cart";
import { useNavigate } from "react-router";
import { ShoppingBag } from "lucide-react";

import "../../styles/cart.css";

export default function CartPage() {
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart__emptyContainer">
        <div className="cart__shoppingBagIcon">
          <ShoppingBag />
        </div>
        <p className="cart__emptyText">
          Your shopping bag is empty at the moment. Take a look at our{" "}
          <a
            className="cart__emptyProducts"
            onClick={() => navigate("/products")}
          >
            products.
          </a>
        </p>
      </div>
    );
  }

  return (
    <div class="cart__mainContainer">
      <h2 class="cart__title">Your shopping haul so far:</h2>
      <div class="cart__itemsContainer">
        {cart.map((product) => (
          <CartProduct key={product._id} product={product} />
        ))}
      </div>
      <div class="cart__checkoutContainer">
        <h2 class="cart__checkoutTitle">Checkout</h2>
        <div class="cart__totalsContainer">
          <div class="cart__subTotalText">
            <span>Sub Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <div class="cart__subTotalText">
            <span>Delivery:</span>
            <span>€0.00</span>
          </div>
          <div class="cart__subTotalText">
            <span>IVA:</span>
            <span>€0.00</span>
          </div>
          <div class="cart__totalText">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
        <button class="cart__purchaseBtn">Pay</button>
        <button onClick={clearCart} class="cart__clearAllBtn">
          Clear your Cart
        </button>
      </div>
    </div>
  );
}
