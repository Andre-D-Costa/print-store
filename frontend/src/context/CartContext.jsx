import { createContext, useState, useContext } from "react";

// Cria o context com os seus valores
const CartContext = createContext({
  cart: null,
  addCart: () => {},
  removeCart: () => {},
});

// Declara os valores no provider do context
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    cartQuantity: 0,
    total: 0, // preço
  });

  const addCart = (input) => {
    const cartItem = cart.items.find((item) => item.id === input.id);
    if (cartItem) {
      const newCartItem = cart.items.map((item) => {
        const quantity =
          item.id === input.id ? item.quantity + 1 : item.quantity;
        return {
          ...item,
          quantity,
        };
      });
      setCart({
        ...cart,
        cartQuantity: cart.cartQuantity + 1,
        items: newCartItem,
        total: cart.total + input.price,
      });
    } else {
      setCart({
        ...cart,
        cartQuantity: cart.cartQuantity + 1,
        items: [{ ...input, quantity: 1 }, ...cart.items],
        total: cart.total + input.price,
      });
    }
  };

  const removeCart = (id) => {
    const excludeItem = cart.items.find((item) => item.id === id);
    const filteredList = cart.items.filter((item) => item.id !== id);
    setCart({
      ...cart,
      cartQuantity: cart.cartQuantity - excludeItem.quantity,
      items: filteredList,
      total: cart.total - excludeItem.quantity * excludeItem.price,
    });
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Lê os valores do context
export const useCartContext = () => useContext(CartContext);
