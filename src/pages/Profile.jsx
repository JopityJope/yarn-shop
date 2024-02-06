import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const { currentUser, logout, getData } = useAuth();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { firstName, lastName } = await getData();
        setUserData({ firstName, lastName });
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [getData]);

  /*   const handleDelete = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await getData();

      if (userData) {
        const { id } = userData;
        await deleteData(id);
      }
      await deleteAccount();
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      setError("Failed to delete account");
    }
  }; */

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logout();
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
          <li className="filter__item">Profile</li>
          <li className="filter__item">My orders</li>
        </ul>
        <p style={{ marginTop: "1rem" }} className="message message--error">
          {error}
        </p>

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
      </div>
    </>
  );
}

export default Profile;
