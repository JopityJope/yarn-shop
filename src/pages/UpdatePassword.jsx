import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";

function UpdatePassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword();
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
          <h3 className="heading-secondary">Change your password</h3>

          <p className="message message--error">{error}</p>
          <p className="message">{message}</p>

          <button disabled={loading} className="login__button" type="submit">
            Reset password
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdatePassword;
