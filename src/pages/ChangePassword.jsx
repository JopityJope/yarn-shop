import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ChangePassword() {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { changeEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await changeEmail(newEmail, password);
      /*   setMessage("Please check your e-mail for a verification link."); */
    } catch (error) {
      setError("Failed to update e-mail");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet title="Log in" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Update e-mail</h3>
          <p>{error}</p>
          <div className="input__wrapper">
            <input
              id="mail"
              className="login__input"
              type="mail"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <label className="login__label" htmlFor="mail">
              New e-mail
            </label>
          </div>
          <div className="input__wrapper">
            <input
              id="password"
              className="login__input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="login__label" htmlFor="mail">
              Password
            </label>
          </div>

          <button disabled={loading} className="login__button" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
