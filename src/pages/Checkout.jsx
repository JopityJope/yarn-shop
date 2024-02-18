import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  transformYarnName,
  formattedDeliveryDate,
  calculateSale,
} from "../utils/utils";
import LogInSignUp from "../components/Checkout/LogInSignUp";

function Checkout() {
  const { currentUser, getData, updateDelivery, updatePayment, updateOrders } =
    useAuth();
  const { cartItems, deleteAllFromCart } = useCart();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { firstName, lastName, deliveryAddress, orders, payment } =
          await getData();

        setUserData({
          firstName,
          lastName,
          deliveryAddress,
          orders,
          payment,
        });

        console.log(payment);
        setFirstName(deliveryAddress?.firstName || "");
        setLastName(deliveryAddress?.lastName || "");
        setPhone(deliveryAddress?.phone || "");
        setAddress(deliveryAddress?.address || "");
        setCity(deliveryAddress?.city || "");
        setPostcode(deliveryAddress?.postcode || "");
        setCountry(deliveryAddress?.country || "");

        setMonth(payment?.month || "");
        setYear(payment?.year ? payment.year.toString().slice(-2) : "");
        setNameOnCard(payment?.nameOnCard || "");
        setCardNumber(payment?.cardNumber ? payment.cardNumber.slice(-4) : "");
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [getData]);

  const [month, setMonth] = useState("");
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    setCardNumber(formattedValue);
  };

  const [nameOnCard, setNameOnCard] = useState("");
  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const [cvv, setCvv] = useState("");
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
  };

  const handleKeyDown = (e) => {
    if (
      !(
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        (e.key >= "0" && e.key <= "9")
      )
    ) {
      e.preventDefault();
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const radioButton = () => {};

  const checkoutSubmit = async (e) => {
    e.preventDefault();
    const deliveryData = {
      firstName,
      lastName,
      phone,
      address,
      city,
      postcode,
      country,
    };
    console.log(deliveryData);

    updateDelivery(deliveryData);
    if (isChecked) {
      const paymentData = { month, cardNumber, year, nameOnCard };

      updatePayment(paymentData);
    }
    const date = new Date();
    const timestamp = date.toISOString();
    const orderData = { ...cartItems, totalPrice, timestamp };
    const userData = await getData();
    if (userData && userData.orders) {
      const combinedOrders = [userData.orders, orderData];
      updateOrders(combinedOrders);
    } else updateOrders(orderData);

    await deleteAllFromCart();

    navigate("/order");
  };

  const subtotal = cartItems
    .reduce((total, cartItem) => {
      const itemPrice = cartItem.item.sale
        ? calculateSale(cartItem.item.price)
        : cartItem.item.price;

      return total + cartItem.quantity * itemPrice;
    }, 0)
    .toFixed(2);

  const deliveryPrice = subtotal < 20 ? (2.6).toFixed(2) : 0;

  const totalPrice = Number(deliveryPrice) + Number(subtotal);

  return !currentUser ? (
    <LogInSignUp />
  ) : (
    <>
      <Helmet title="Checkout" />
      <div className="login__container">
        <form className="login" onSubmit={checkoutSubmit}>
          <h3 className="heading-secondary">Checkout</h3>

          <p className="checkout__title">My bag</p>
          <ul className="checkout__items">
            {cartItems.map((cartItem) => (
              <li
                className={`checkout__item`}
                key={`${cartItem.item.id}${cartItem.color}`}
              >
                <Link to={`/product-page/${cartItem.item.id}`}>
                  <img
                    src={`/${transformYarnName(cartItem.item.name)}/colors/${
                      cartItem.color + 1
                    }.jpg`}
                    alt=""
                    loading="lazy"
                    className="checkout__image"
                  />
                </Link>
              </li>
            ))}
          </ul>
          {!userData.deliveryAddress ? (
            <div className="checkout__section">
              <p className="checkout__title">Delivery address</p>

              <div className="input__wrapper">
                <input
                  id="firstName"
                  className="checkout__input"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="firstName">
                  First name
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="lastName"
                  className="checkout__input"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="firstName">
                  Last name
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="phone"
                  className="checkout__input"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="phone">
                  Phone
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="address"
                  className="checkout__input"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="address">
                  Address
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="city"
                  className="checkout__input"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="city">
                  City
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="postcode"
                  className="checkout__input"
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="postcode">
                  Postcode
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="country"
                  className="checkout__input"
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="country">
                  Country
                </label>
              </div>
            </div>
          ) : (
            <div className="checkout__section">
              <div className="checkout__title__container">
                <p className="checkout__title">Delivery address</p>
                <p className="edit__button">Edit</p>
              </div>

              <div className="checkout__text__container">
                <p className="checkout__text">
                  {firstName} {lastName}
                </p>
                <p className="checkout__text">{phone} </p>
                <p className="checkout__text">{address} </p>
                <p className="checkout__text">{city} </p>
                <p className="checkout__text">{postcode} </p>
                <p className="checkout__text">{country} </p>
              </div>
            </div>
          )}

          {/* DELIVERY OPTIONS */}
          <div className="checkout__section">
            <p className="checkout__title">Delivery options</p>
            <div className="radio-button__wrapper">
              <label
                className="radio-button__label"
                htmlFor="standard-delivery"
              >
                <p className="delivery__price">
                  {deliveryPrice !== 0 ? `€ ${deliveryPrice}` : "FREE"}
                </p>
                <div className="delivery__details">
                  <p className="delivery__name">
                    Standard Delivery - Delivered on or before{" "}
                    {formattedDeliveryDate}
                  </p>
                  <p className="delivery__info">
                    (No delivery on Public Holidays)
                  </p>
                </div>
              </label>
              <input
                className="radio-button__input"
                type="radio"
                id="standard-delivery"
                name="delivery-option"
                value="standard"
                checked
                onChange={radioButton}
              />
            </div>
          </div>
          {/* PAYEMENT */}

          {!userData.payment ? (
            <div className="checkout__section">
              <p className="checkout__title">Payment</p>
              <div className="input__wrapper">
                <input
                  id="card-number"
                  className="checkout__input"
                  maxLength="19"
                  type="text"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  style={{ width: "300px" }}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="country">
                  Card number
                </label>
              </div>

              <div className="select__wrapper">
                <select id="month" value={month} onChange={handleMonthChange}>
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthValue = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={i} value={monthValue}>
                        {monthValue}
                      </option>
                    );
                  })}
                </select>

                <select id="year" value={year} onChange={handleYearChange}>
                  <option value="">Year</option>
                  {Array.from({ length: 11 }, (_, i) => {
                    const yearOption = currentYear + i;
                    return (
                      <option key={i} value={yearOption}>
                        {yearOption}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="input__wrapper">
                <input
                  id="nameOnCard"
                  className="checkout__input"
                  maxLength="19"
                  type="text"
                  required
                  value={nameOnCard}
                  onChange={handleNameOnCardChange}
                  style={{ width: "300px" }}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="nameOnCard">
                  Name on card
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="cvv"
                  className="checkout__input"
                  maxLength="3"
                  type="text"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                  onKeyDown={handleKeyDown}
                  style={{ width: "80px" }}
                  autoComplete="off"
                />
                <label className="checkout__label" htmlFor="cvv">
                  CVV
                </label>
              </div>
              <div className="checkbox">
                <input
                  id="saveForLater"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="checkbox__label" htmlFor="saveForLater">
                  Save for later
                </label>
              </div>
            </div>
          ) : (
            <div className="checkout__section">
              <div className="checkout__title__container">
                <p className="checkout__title">Payment</p>
                <p className="edit__button">Edit</p>
              </div>

              <div className="checkout__text__container">
                <p className="checkout__text">VISA ({cardNumber})</p>
                <p className="checkout__text">
                  Exp: {month}/{year}{" "}
                </p>
                <p className="checkout__text">{nameOnCard} </p>

                <div className="input__wrapper">
                  <input
                    id="cvv"
                    className="checkout__input"
                    maxLength="3"
                    type="text"
                    required
                    value={cvv}
                    onChange={handleCvvChange}
                    onKeyDown={handleKeyDown}
                    style={{ width: "80px" }}
                    autoComplete="off"
                  />
                  <label className="checkout__label" htmlFor="cvv">
                    CVV
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="no-yarns__message">
            <div className="subtotal">
              <p>Subtotal:&nbsp;</p>
              <p className="subtotal">{subtotal} €</p>
            </div>

            <div className="subtotal">
              <p>Delivery:&nbsp;</p>
              <p className="subtotal">
                {deliveryPrice !== 0 ? `${deliveryPrice} € ` : "Free"}
              </p>
            </div>

            <div className="total">
              <p>TOTAL TO PAY:&nbsp;</p>
              <p className="total">{totalPrice} €</p>
            </div>
            <p className="message message--error">{/* error */}</p>
            <button className="login__button" type="submit">
              BUY NOW
            </button>
          </div>
          {deliveryPrice !== 0 ? (
            <p className="delivery__message">
              FREE Standard Delivery when you spend over 20.00 €
            </p>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Checkout;
