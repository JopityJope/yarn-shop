import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { forgottenPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await forgottenPassword(email);
      setMessage("Check your email for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet title="Password Reset" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Password Reset</h3>

          <p className="message message--error">{error}</p>
          <p className="message">{message}</p>

          <div className="input__wrapper">
            <input
              id="mail"
              className="login__input"
              type="mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="login__label" htmlFor="mail">
              E-mail
            </label>
          </div>

          <button disabled={loading} className="login__button" type="submit">
            Reset password
          </button>
        </form>
      </div>
    </>
  );
}

export default PasswordReset;
