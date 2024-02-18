import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { transformYarnName } from "../utils/utils";
import { useWishlist } from "../contexts/WishlistContext";

function Profile() {
  const { currentUser, logout, getData } = useAuth();
  const { deleteAllFromCart } = useCart();
  const { deleteAllFromWishlist } = useWishlist();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [isProfile, setIsProfile] = useState(true);
  const navigate = useNavigate();
  const [sortedOrders, setSortedOrders] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { firstName, lastName, deliveryAddress, orders } =
          await getData();

        setUserData({ firstName, lastName, deliveryAddress, orders });

        if (orders) {
          const sortedOrders = orders.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });

          setSortedOrders(sortedOrders);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [getData]);

  if (userData && userData.orders) {
    const orders = Object.keys(userData.orders).map(
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
      await deleteAllFromWishlist();
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

        {isProfile && userData && currentUser ? (
          <>
            {userData.firstName && (
              <Link to="update-firstname" className="update__link">
                <div>
                  <p className="update__text--uppercase">First name</p>
                  <p className="update__text">{userData.firstName}</p>
                </div>
              </Link>
            )}
            {userData.lastName && (
              <Link to="update-lastname" className="update__link">
                <div>
                  <p className="update__text--uppercase">Last name</p>
                  <p className="update__text">{userData.lastName}</p>
                </div>
              </Link>
            )}
            {currentUser.email && (
              <Link to="update-email" className="update__link">
                <div>
                  <p className="update__text--uppercase">Email</p>
                  <p className="update__text">{currentUser.email}</p>
                </div>
              </Link>
            )}

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
            {sortedOrders && sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <div key={order.timestamp} className="order">
                  <p className="myorders__text">
                    {`${new Date(order.timestamp).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}  / ${new Date(order.timestamp).toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}`}
                  </p>
                  <ul className="myorders__items">
                    {order.cartItems.map((item) => (
                      <li
                        className={`myorders__item`}
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
                  <p className="myorders__text">{order.totalPrice}€</p>
                </div>
              ))
            ) : (
              <>
                <p className="update__text">
                  No orders yet... &nbsp;
                  <Link className="update__text--uppercase" to={"/"}>
                    Browse shop
                  </Link>
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
