import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet title="Order" />
      <div className="notfound__container">
        <img src="error.jpg" alt="" className="notfound__image" />
        <div className="notfound__text">
          <h2 className="heading-secondary">404: Page not found</h2>
          <p className="heading-tertiary">
            Sorry, we can't find that page! It might be an old link or maybe the
            page was moved.
          </p>
          <Link to={"/"} className="login__button" href="ss">
            Browse shop
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
