import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { calculateSale, transformYarnName } from "../utils/utils";
import { Link } from "react-router-dom";
import Close from "../components/Header/icons/Close";

function WishList() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  useEffect(() => {
    console.log(wishlistItems);
  }, [wishlistItems]);

  const selectColor = (i) => {
    setSelectedColor(wishlistItems[i]);
  };

  useEffect(() => {
    if (selectColor) {
      setTimeout(() => {
        removeFromWishlist(selectedColor.item, selectedColor.color);
      }, 300);
    }
  }, [selectedColor]);

  const moveToCart = (item, color) => {
    setTimeout(() => {
      removeFromWishlist(item, color);
      addToCart(item, color, 1);
    }, 300);
  };

  return (
    <>
      <div className="wishlist__container">
        <h3 className="heading-secondary">Saved Items</h3>
      </div>

      <div className="wishlist__container">
        <Helmet title="Wishlist" />
        {wishlistItems.length === 0 ? (
          <>
            <p className="no-yarns__message">
              Want to save the items you love? Just click on the heart icon
              found on the product image and it will show up here.
              <Link to={"/"} className="clear-filter__button">
                Browse now
              </Link>
            </p>
          </>
        ) : (
          <>
            {wishlistItems.map((wishlistItem, i) => (
              <li
                className="wishlist__item"
                key={`${wishlistItem.item.id}${wishlistItem.color}`}
              >
                <Link to={`/product-page/${wishlistItem.item.id}`}>
                  <img
                    src={`/${transformYarnName(
                      wishlistItem.item.name
                    )}/colors/${wishlistItem.color + 1}.jpg`}
                    alt=""
                    loading="lazy"
                    className="wishlist__image"
                  />
                </Link>

                <div className="wishlist__details">
                  <div
                    className="wishlist__close-btn"
                    onClick={() => {
                      selectColor(i);
                    }}
                  >
                    <Close />
                  </div>
                  <Link to={`/product-page/${wishlistItem.item.id}`}>
                    <h3 className="wishlist__name">
                      {`${wishlistItem.item.name} in ${
                        wishlistItem.item.colorNames[wishlistItem.color]
                      }`}
                    </h3>
                  </Link>
                  {wishlistItem.item.sale ? (
                    <p className="wishlist__price">
                      <span className="wishlist__price wishlist__price--old">
                        {wishlistItem.item.price.toFixed(2)}€
                      </span>
                      &nbsp;
                      <span className="wishlist__price wishlist__price--sale">
                        {calculateSale(wishlistItem.item.price)}€{" "}
                      </span>
                      <span className="wishlist__price wishlist__price--percentage">
                        (-30%)
                      </span>
                    </p>
                  ) : (
                    <p className="wishlist__price">
                      {wishlistItem.item.price.toFixed(2)}€
                    </p>
                  )}

                  <button
                    onClick={() =>
                      moveToCart(wishlistItem.item, wishlistItem.color)
                    }
                    className="wishlist__button "
                  >
                    Move to cart
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
      </div>
      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="wishlist__container">
          <p className="no-yarns__message">
            Sign up to sync your Saved Items across all your devices.
            <Link to={"/signup"} className="clear-filter__button">
              Sign up
            </Link>
          </p>
        </div>
      ) : null}
    </>
  );
}

export default WishList;
