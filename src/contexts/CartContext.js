import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { currentUser, updateCart, getData } = useAuth();
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartItems, setCartItems] = useState(storedCart);

  const addToCart = (item, color, quantity) => {
    const existingCartItems = [...cartItems];

    const existingItemIndex = existingCartItems.findIndex(
      (cartItem) => cartItem.item.id === item.id && cartItem.color === color
    );

    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity += quantity;
      setCartItems(existingCartItems);
    } else {
      setCartItems([...existingCartItems, { item, color, quantity }]);
    }
  };

  const removeFromCart = (item, color) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.item !== item || cartItem.color !== color
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (i) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[i].quantity = Math.max(
      1,
      updatedCartItems[i].quantity - 1
    );
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (i) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[i].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const fetchUserData = async () => {
    try {
      const userData = await getData();
      if (userData && userData.cart) {
        const combinedCartItems = [...cartItems, ...userData.cart];

        const uniqueItemsSet = new Set();
        const updatedCartItems = [];

        combinedCartItems.forEach((item) => {
          const itemKey = `${item.item}-${item.color}`;

          if (!uniqueItemsSet.has(itemKey)) {
            uniqueItemsSet.add(itemKey);
            updatedCartItems.push(item);
          }
        });

        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllFromCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem("cart", serializedCart);
  }, [cartItems]);

  useEffect(() => {
    updateCart(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCart,
        decreaseQuantity,
        increaseQuantity,
        deleteAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
