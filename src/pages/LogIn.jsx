import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);

      navigate("/profile");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Please provide a valid email");
      } else if (error.code === "auth/invalid-login-credentials") {
        setError("Invalid login credentials");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many failed login attempts");
      } else {
        setError("Failed to log-in. Please try again later");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet title="Log in" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Log in to your account</h3>
          <p className="message message--error">{error}</p>
          <div className="input__wrapper">
            <input
              id="mail"
              className="login__input"
              type="mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <label className="login__label" htmlFor="mail">
              E-mail
            </label>
          </div>
          <div className="input__wrapper">
            <input
              id="password"
              className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <label className="login__label" htmlFor="passwprd">
              Password
            </label>
          </div>
          <button disabled={loading} className="login__button" type="submit">
            Log in
          </button>
          <Link to="/forgotten-password" className="password__link" href="">
            Have you forgotten your password?
          </Link>
        </form>
        <div className="signup">
          <h1 className="heading-secondary">Need an account?</h1>
          <Link className="login__button" to="/signup">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default LogIn;
