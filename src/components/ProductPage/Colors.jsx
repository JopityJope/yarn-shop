import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Close from "../Header/icons/Close";
import { transformYarnName, calculateSale } from "../../utils/utils";
import Heart from "../Icons/Heart";
import HeartFilled from "../Icons/HeartFilled";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";

function Colors({ selectedYarn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isInWishlistModal = wishlistItems.some(
    (wishlistItem) =>
      wishlistItem.item.id === selectedYarn.id &&
      wishlistItem.color === selectedColor
  );

  const handleAddToWishlistModal = () => {
    if (isInWishlistModal) {
      removeFromWishlist(selectedYarn, selectedColor);
    } else {
      addToWishlist(selectedYarn, selectedColor);
    }
  };

  const handleAddColorToWishlist = (i) => {
    if (isColorInWishlist(i)) {
      removeFromWishlist(selectedYarn, i);
    } else {
      addToWishlist(selectedYarn, i);
    }
  };

  const isColorInWishlist = (i) => {
    return wishlistItems.some(
      (wishlistItem) =>
        wishlistItem.item.id === selectedYarn.id && wishlistItem.color === i
    );
  };

  const selectColor = (i) => {
    setSelectedColor(i);
  };

  useEffect(() => {
    if (selectedColor !== "")
      console.log("Updated Wishlist Items:", wishlistItems);
  }, [wishlistItems]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addToCart(selectedYarn, selectedColor, quantity);
      setIsLoading(false);
      setIsAddedToCart(true);

      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setQuantity(1);
    setIsAddedToCart(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {selectedYarn.colorNames && selectedYarn.name ? (
        <h2 className="heading-secondary">
          {selectedYarn.colorNames.length} colors in {selectedYarn.name}
        </h2>
      ) : null}

      {isOpen && <div className="overlay" onClick={closeModal}></div>}
      <Modal className="modal__product" open={isOpen}>
        <div className="modal__close-btn" onClick={closeModal}>
          <Close />
        </div>

        {selectedYarn.name && selectedColor !== undefined && (
          <img
            src={`/${transformYarnName(selectedYarn.name)}/colors/${
              selectedColor + 1
            }.jpg`}
            alt=""
            loading="lazy"
            className="modal__image"
          />
        )}
        <div>
          {selectedYarn.name && selectedYarn.colorNames && (
            <h3 className="modal__heading">
              {selectedYarn.name} {selectedYarn.colorNames[selectedColor]}
            </h3>
          )}

          {selectedYarn.price && (
            <div className="product__price">
              {!selectedYarn.sale ? (
                <p className="product__price">{selectedYarn.price}€</p>
              ) : (
                <>
                  <p className="yarn__price--old">
                    {(selectedYarn.price * quantity).toFixed(2)}€
                  </p>
                  <p className="yarn__price--sale">
                    {(calculateSale(selectedYarn.price) * quantity).toFixed(2)}€
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="modal__quantity">
          <button
            className="quantity__button"
            disabled={quantity <= 1}
            onClick={decreaseQuantity}
          >
            -
          </button>
          <p className="quantity__number">{quantity}</p>
          <button className="quantity__button" onClick={increaseQuantity}>
            +
          </button>
        </div>
        <div className="modal__buttons">
          <button
            onClick={handleAddToCart}
            className="modal__button"
            disabled={isLoading}
          >
            {isLoading
              ? "Adding to Cart..."
              : isAddedToCart
              ? "Added"
              : "Add to cart"}
          </button>
          <div className="modal__wishlist" onClick={handleAddToWishlistModal}>
            {isInWishlistModal ? (
              <HeartFilled className="wishlist__icon" />
            ) : (
              <Heart className="wishlist__icon" />
            )}
          </div>
        </div>
      </Modal>

      <div className="colors">
        {Array.from({ length: `${selectedYarn.colorNames.length}` }).map(
          (_, i) => (
            <div key={i} className="color">
              {selectedYarn.name && (
                <img
                  src={`/${transformYarnName(selectedYarn.name)}/colors/${
                    i + 1
                  }.jpg`}
                  alt=""
                  loading="lazy"
                  className="color__image"
                  onClick={() => {
                    openModal();
                    selectColor(i);
                  }}
                />
              )}

              <div
                className="color__icon__container"
                onClick={() => {
                  selectColor(i);
                  handleAddColorToWishlist(i);
                }}
              >
                {isColorInWishlist(i) ? (
                  <HeartFilled className="color__icon color__icon--filled" />
                ) : (
                  <HeartFilled className="color__icon" />
                )}
              </div>

              {selectedYarn.colorNames && (
                <p className="color__name">{selectedYarn.colorNames[i]}</p>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Colors;
