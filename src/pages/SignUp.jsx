import { useState } from "react";
import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup, addData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/profile");
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
      <Helmet title="Sign up" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Enter personal details</h3>

          <p className="message message--error">{error}</p>
          <div className="input__wrapper">
            <input
              id="email"
              className="login__input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
            <label className="login__label" htmlFor="firstName">
              Last name
            </label>
          </div>

          <button disabled={loading} className="login__button" type="submit">
            Create account
          </button>
          <Link to="/login" className="password__link" href="">
            Already have an account?
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
