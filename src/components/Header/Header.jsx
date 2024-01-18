import React from "react";
import { NavLink } from "react-router-dom";
import Heart from "./icons/Heart";
import User from "./icons/User";
import Cart from "./icons/Cart";
import Search from "./icons/Search";
import SearchForm from "./icons/SearchForm";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { currentUser } = useAuth();
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= 990
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 990);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const handleClick = () => {
    setIsActiveMobile(true);
  };
  const handleCloseMobileSearch = () => {
    setIsActiveMobile(false);
  };

  return (
    <header className="header">
      {isSmallScreen ? (
        <SearchForm
          isActiveMobile={isActiveMobile}
          onClose={handleCloseMobileSearch}
        />
      ) : (
        ""
      )}

      <div className="header-container">
        <NavLink to="/">
          <h1 className="heading-primary">DROPS Yarns</h1>
        </NavLink>

        <nav className="nav">
          <div className="nav__item">
            <span className="nav__icon" onClick={handleClick}>
              {isSmallScreen ? (
                <Search />
              ) : (
                <SearchForm
                  isActiveMobile={isActiveMobile}
                  onClose={handleCloseMobileSearch}
                />
              )}
            </span>
          </div>

          <div className="nav__item">
            <NavLink to="wishlist">
              <span className="nav__icon">
                <Heart />
              </span>
            </NavLink>
          </div>
          <div className="nav__item">
            <NavLink to="cart">
              <span className="nav__icon">
                <Cart />
                <span className="nav__cart-number">1</span>
              </span>
            </NavLink>
          </div>
          <div className="nav__item">
            <NavLink to={currentUser ? "/profile" : "/login"}>
              <span className="nav__icon">
                <User />
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
