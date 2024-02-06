import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const { currentUser, updateWishlist, getData } = useAuth();
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlistItems, setWishlistItems] = useState(storedWishlist);

  const fetchUserData = async () => {
    try {
      const userData = await getData();
      if (userData && userData.wishlist) {
        const combinedWishlistItems = [...wishlistItems, ...userData.wishlist];

        const uniqueItemsSet = new Set();
        const updatedWishlistItems = [];

        combinedWishlistItems.forEach((item) => {
          const itemKey = `${item.item}-${item.color}`;

          if (!uniqueItemsSet.has(itemKey)) {
            uniqueItemsSet.add(itemKey);
            updatedWishlistItems.push(item);
          }
        });

        setWishlistItems(updatedWishlistItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const addToWishlist = (item, color) => {
    const isItemInWishlist = wishlistItems.some(
      (wishlistItem) =>
        wishlistItem.item === item && wishlistItem.color === color
    );
    if (!isItemInWishlist) {
      setWishlistItems((prevWishlistItems) => [
        ...prevWishlistItems,
        { item, color },
      ]);
    }
  };

  const removeFromWishlist = (item, color) => {
    const updatedWishlist = wishlistItems.filter(
      (wishlistItem) =>
        wishlistItem.item !== item || wishlistItem.color !== color
    );
    setWishlistItems(updatedWishlist);
  };

  useEffect(() => {
    const serializedWishlist = JSON.stringify(wishlistItems);
    localStorage.setItem("wishlist", serializedWishlist);
  }, [wishlistItems]);

  useEffect(() => {
    updateWishlist(wishlistItems);
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
