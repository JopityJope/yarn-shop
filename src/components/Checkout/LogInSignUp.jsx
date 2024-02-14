import React, { useState } from "react";
import Helmet from "../Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function LogInSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { login, signup, addData } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);

      navigate("/checkout");
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/checkout");
      await addData({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Please provide a valid email");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long");
      } else {
        setError("Failed to create an account. Try again later");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet title={isLogin ? "Log in" : "Sign up"} />
      <div className="loginsignup__container">
        <ul className="options">
          <li
            className={`options__item ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </li>
          <li
            className={`options__item ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </li>
        </ul>
        {isLogin ? (
          <form className="loginsignup" onSubmit={handleLogin}>
            <>
              <p className="message message--error">{error}</p>
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
              <div className="input__wrapper">
                <input
                  id="password"
                  className="login__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="login__label" htmlFor="passwprd">
                  Password
                </label>
              </div>
              <button
                disabled={loading}
                className="login__button"
                type="submit"
              >
                Log in
              </button>
              <Link to="/forgotten-password" className="password__link" href="">
                Have you forgotten your password?
              </Link>
            </>
          </form>
        ) : (
          <form className="loginsignup" onSubmit={handleSignUp}>
            <>
              <p className="message message--error">{error}</p>
              <div className="input__wrapper">
                <input
                  id="email"
                  className="login__input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="login__label" htmlFor="email">
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
                />
                <label className="login__label" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="firstName"
                  className="login__input"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="login__label" htmlFor="firstName">
                  First name
                </label>
              </div>

              <div className="input__wrapper">
                <input
                  id="lastName"
                  className="login__input"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="login__label" htmlFor="firstName">
                  Last name
                </label>
              </div>

              <button
                disabled={loading}
                className="login__button"
                type="submit"
              >
                Create account
              </button>
            </>
          </form>
        )}
      </div>
    </>
  );
}

export default LogInSignUp;
