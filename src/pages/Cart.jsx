import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { transformYarnName, calculateSale } from "../utils/utils";
import Close from "../components/Header/icons/Close";
import HeartFilled from "../components/Icons/HeartFilled";

function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { currentUser } = useAuth();
  const { addToWishlist } = useWishlist();
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    setTotalPrice(
      cartItems
        .reduce((total, cartItem) => {
          const itemPrice = cartItem.item.sale
            ? calculateSale(cartItem.item.price)
            : cartItem.item.price;

          return total + cartItem.quantity * itemPrice;
        }, 0)
        .toFixed(2)
    );
  }, [cartItems]);

  const moveToWishlist = (item, color) => {
    setTimeout(() => {
      removeFromCart(item, color);
      addToWishlist(item, color);
    }, 300);
  };

  const handleRemoveFromCart = (item, color) => {
    setTimeout(() => {
      removeFromCart(item, color);
    }, 300);
  };
  return (
    <div>
      <Helmet title="Cart" />
      <>
        <div className="cart__container">
          <h3 className="heading-secondary">My cart</h3>
          {cartItems.length > 0 && (
            <div className="no-yarns__message">
              <div className="total">
                <p>
                  TOTAL:&nbsp;
                  <span className="total__delivery">(excluding delivery)</span>
                </p>
                <p className="total__price">{totalPrice} €</p>
              </div>

              <Link
                to={"/checkout"}
                className="cart__button cart__button--chekcout"
              >
                Continue to checkout
              </Link>
            </div>
          )}
        </div>

        <div className="cart__container">
          {currentUser && cartItems.length === 0 ? (
            <>
              <p className="no-yarns__message">
                Your cart is empty!
                <Link to={"/"} className="clear-filter__button">
                  Browse now
                </Link>
              </p>
            </>
          ) : (
            <>
              {cartItems.map((cartItem, i) => (
                <li
                  className={`cart__item`}
                  key={`${cartItem.item.id}${cartItem.color}`}
                >
                  <Link
                    className="cart__image"
                    to={`/product-page/${cartItem.item.id}`}
                  >
                    <img
                      src={`/${transformYarnName(cartItem.item.name)}/colors/${
                        cartItem.color + 1
                      }.jpg`}
                      alt=""
                      loading="lazy"
                    />
                  </Link>

                  <div className="cart__details">
                    <div
                      className="wishlist__close-btn"
                      onClick={() =>
                        handleRemoveFromCart(cartItem.item, cartItem.color, i)
                      }
                    >
                      <Close />
                    </div>
                    <Link to={`/product-page/${cartItem.item.id}`}>
                      <h3 className="cart__name">
                        {`${cartItem.item.name} in ${
                          cartItem.item.colorNames[cartItem.color]
                        }`}
                      </h3>
                    </Link>
                    {cartItem.item.sale ? (
                      <p className="cart__price">
                        <span className="cart__price cart__price--old">
                          {cartItem.item.price.toFixed(2)}€
                        </span>
                        &nbsp;
                        <span className="cart__price cart__price--sale">
                          {calculateSale(cartItem.item.price)}€
                        </span>
                        <span className="cart__price cart__price--percentage">
                          (-30%)
                        </span>
                      </p>
                    ) : (
                      <p className="cart__price">
                        {cartItem.item.price.toFixed(2)}€
                      </p>
                    )}
                    {cartItem.item.sale ? (
                      <p className="cart__price">
                        Total: &nbsp;
                        <span className="cart__price cart__price--old">
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                          €
                        </span>
                        &nbsp;
                        <span className="cart__price cart__price--sale">
                          {(
                            calculateSale(cartItem.item.price) *
                            cartItem.quantity
                          ).toFixed(2)}
                          €
                        </span>
                      </p>
                    ) : (
                      <p className="cart__price">
                        Total: &nbsp;
                        {(cartItem.item.price * cartItem.quantity).toFixed(2)}€
                      </p>
                    )}

                    <div className="cart__quantity">
                      <button
                        className="quantity__button"
                        disabled={cartItem.quantity <= 1}
                        onClick={() => decreaseQuantity(i)}
                      >
                        -
                      </button>
                      <p className="quantity__number">{cartItem.quantity}</p>

                      <button
                        className="quantity__button"
                        onClick={() => increaseQuantity(i)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        moveToWishlist(cartItem.item, cartItem.color, i)
                      }
                      className="cart__button"
                    >
                      <HeartFilled className="cart__icon" />
                      Save for later
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </div>
        {!currentUser && cartItems.length === 0 ? (
          <div className="cart__container">
            <p className="no-yarns__message">
              Sign up to sync your Cart across all your devices.
              <Link to={"/signup"} className="clear-filter__button">
                Sign up
              </Link>
            </p>
          </div>
        ) : null}
      </>
    </div>
  );
}

export default Cart;
