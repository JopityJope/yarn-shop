import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UpdateLastName() {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const { updateLastName, getData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const userData = await getData();
      const id = userData.id;
      await updateLastName(id, newName);

      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError("Failed to change name. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Name Reset" />
      <div className="login__container">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="heading-secondary">Change your last name</h3>

          <p className="message message--error">{error}</p>

          <div className="input__wrapper">
            <input
              id="mail"
              className="login__input"
              type="mail"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label className="login__label" htmlFor="mail">
              New last name
            </label>
          </div>
          <button disabled={loading} className="login__button" type="submit">
            Change name
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateLastName;
