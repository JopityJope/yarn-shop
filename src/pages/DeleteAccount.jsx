import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { deleteAccount, deleteData, getData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await getData();

      if (userData) {
        const { id } = userData;
        await deleteData(id);
      }
      await deleteAccount(password);
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      setError("Failed to delete account");
    }
  };

  return (
    <>
      <Helmet title="Delete Account" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Delete Account</h3>
          <p>
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </p>
          <div className="input__wrapper">
            <label className="label__delete" htmlFor="mail">
              To confirm this enter your password
            </label>
            <input
              id="password"
              className="login__input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="message message--error">{error}</p>

          <button disabled={loading} className="login__button" type="submit">
            Delete Account
          </button>
        </form>
      </div>
    </>
  );
}

export default DeleteAccount;
