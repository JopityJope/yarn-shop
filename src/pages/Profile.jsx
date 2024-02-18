import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { transformYarnName } from "../utils/utils";

function Profile() {
  const { currentUser, logout, getData } = useAuth();
  const { deleteAllFromCart } = useCart();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [isProfile, setIsProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { firstName, lastName, deliveryAddress, orders } =
          await getData();

        setUserData({ firstName, lastName, deliveryAddress, orders });
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [getData]);

  let orders = [];
  if (userData && userData.orders) {
    orders = Object.keys(userData.orders).map(
      (timestamp) => new Date(timestamp)
    );
    orders.sort((a, b) => b - a);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logout();
      await deleteAllFromCart();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <>
      <Helmet title="Profile" />

      <div className="profile__container">
        <ul className="filter__container">
          <li
            className={`options__item ${isProfile ? "active" : ""}`}
            onClick={() => setIsProfile(true)}
          >
            Profile
          </li>
          <li
            className={`options__item ${!isProfile ? "active" : ""}`}
            onClick={() => setIsProfile(false)}
          >
            My orders
          </li>
        </ul>
        <p style={{ marginTop: "1rem" }} className="message message--error">
          {error}
        </p>

        {isProfile ? (
          <>
            <Link to="update-firstname" className="update__link">
              <div>
                <p className="update__text--uppercase">First name</p>
                <p className="update__text">{userData.firstName}</p>
              </div>
            </Link>

            <Link to="update-lastname" className="update__link">
              <div>
                <p className="update__text--uppercase">Last name</p>
                <p className="update__text">{userData.lastName}</p>
              </div>
            </Link>
            <Link to="update-email" className="update__link">
              <div>
                <p className="update__text--uppercase">Email</p>
                <p className="update__text">{currentUser.email}</p>
              </div>
            </Link>
            <Link to="change-password" className="update__link">
              <div>
                <p className="update__text--uppercase">Password</p>
                <p className="update__text">●●●●●●</p>
              </div>
            </Link>

            <button className="login__button" onClick={handleLogout}>
              Log out
            </button>

            <Link to="delete-acount" className="password__link">
              <div>
                <p className="update__text--uppercase"> Delete your account</p>
              </div>
            </Link>
          </>
        ) : (
          <>
            {orders.length > 0 ? (
              orders.map((timestamp) => (
                <div key={timestamp.toISOString()} className="order">
                  <p className="update__text">
                    Order number: {timestamp.toISOString()}
                  </p>
                  <ul className="checkout__items">
                    {userData.orders[timestamp.toISOString()].map((item) => (
                      <li
                        className={`checkout__item`}
                        key={`${item.item.id}${item.color}`}
                      >
                        <Link to={`/product-page/${item.item.id}`}>
                          <img
                            src={`/${transformYarnName(
                              item.item.name
                            )}/colors/${item.color + 1}.jpg`}
                            alt=""
                            loading="lazy"
                            className="checkout__image"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="update__text">€</p>
                </div>
              ))
            ) : (
              <>
                <p className="update__text">
                  No orders yet... &nbsp;
                  <Link className="update__text--uppercase" to={"/"}>
                    Browse shop
                  </Link>{" "}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
