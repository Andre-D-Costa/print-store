import { createContext, useState, useEffect } from "react";

// Cria o context com os seus valores
export const CartContext = createContext({
  cart: [],
  quantity: 0,
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

// Declara os valores no provider do context
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const saveLocalStorage = (items, total, quantity) => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items,
        total,
        quantity,
      })
    );
  };

  const addToCart = (product) => {
    const cartProduct = cart.find((cartItem) => cartItem._id === product._id);
    if (cartProduct) {
      // se o produto existe
      const newCart = cart.map((cartItem) => {
        if (cartItem._id === cartProduct._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });
      const cartValues = newCart.reduce(
        (prev, acc) => {
          return {
            quantity: acc.quantity + prev.quantity,
            totalPrice: acc.price * acc.quantity + prev.totalPrice,
          };
        },
        {
          quantity: 0,
          totalPrice: 0,
        }
      );
      setQuantity(cartValues).quantity;
      setTotal(cartValues.totalPrice);
      setCart(newCart);
      saveLocalStorage(newCart, cartValues.totalPrice, cartValues.quantity);
    } else {
      // se o produto não existe
      setQuantity(quantity + 1);
      setTotal(total + product.price);
      setCart([...cart, { ...product, quantity: 1 }]);
      saveLocalStorage(
        [...cart, { ...product, quantity: 1 }],
        total + product.price,
        quantity + 1
      );
    }
  };

  const removeFromCart = () => {};

  const clearCart = () => {
    setQuantity(0);
    setTotal(0);
    setCart([]);
    saveLocalStorage([], 0, 0);
  };

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");

    if (storageCart) {
      const cartObj = JSON.parse(storageCart);
      setCart(cartObj.items);
      setQuantity(cartObj.quantity);
      setTotal(cartObj.total);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total, quantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Lê os valores do context
export const useCartContext = () => useContext(CartContext);
