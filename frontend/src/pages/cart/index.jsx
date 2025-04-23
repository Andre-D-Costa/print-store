import { useContext } from "react";
import CartProduct from "../../components/CartProduct";
import { CartContext } from "../../context/cart";

import "../../styles/cart.css";

export default function CartPage() {
  const { cart, total } = useContext(CartContext);

  return (
    <div class="cart__mainContainer">
      <div class="cart__itemsContainer">
        <h2 class="cart__title">Your shopping haul so far:</h2>
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
            <span>Entrega:</span>
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
        <button class="cart__purchaseBtn">Finish</button>
      </div>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router";
// import { useCartContext } from "../../context/cart";
// import CartProduct from "../../components/CartProduct";
// import { ShoppingBag } from "lucide-react";

// import "../../styles/cart.css";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { cart, removeCart } = useCartContext();

//   return (
//     <div class="cart__mainContainer">
//       {cart.items.length === 0 ? (
//         <>
//           <div class="cart__icon">
//             <ShoppingBag />
//           </div>
//           <p class="cart__emptyText">
//             Your shopping bag is empty at the moment. Take a look at our{" "}
//             <a
//               class="cart__emptyProducts"
//               onClick={() => {
//                 navigate("/");
//               }}
//             >
//               products.
//             </a>
//           </p>
//         </>
//       ) : (
//         <>
//           <ul class="cart__list">
//             {cart.items.map((item, key) => (
//               <li key={`cart-item-${item.id}-${key}`} class="cart__listItem">
//                 <div class="spans__container">
//                   <span class="cart__itemName">{item.name}</span>
//                   <span class="cart__itemPrice">€ {item.price}</span>
//                   <span class="cart__itemQtty">x {item.quantity}</span>
//                   <span class="cart__itemTotal">
//                     € {item.quantity * item.price}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => {
//                     removeCart(item.id);
//                   }}
//                   class="cart__removeBtn"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <p class="cart__Total">Total: €{cart.total}</p>
//         </>
//       )}
//     </div>
//   );
// }
