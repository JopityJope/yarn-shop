import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Close from "./Close";

function SearchForm({ isActiveMobile, onClose }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCloseClickMobile = () => {
    setIsActive(false);
    onClose();
  };

  //Mobile
  const MobileStructure = (
    <form
      onSubmit={handleSubmit}
      className={isActiveMobile ? "search--mobile active" : "search--mobile"}
    >
      <button className="search__btn--mobile">
        <Search />
      </button>
      <input
        className="search__input--mobile"
        type="text"
        placeholder="i.e. alpaca"
      />

      <button className="close__btn--mobile" onClick={handleCloseClickMobile}>
        <Close />
      </button>
    </form>
  );

  //Desktop
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
    inputRef.current.value = "";
  };

  const DesktopStructure = (
    <form
      onSubmit={handleSubmit}
      className={isActive ? "search active" : "search"}
    >
      <input
        ref={inputRef}
        onBlur={handleBlur}
        className="search__input"
        type="text"
        placeholder="i.e. alpaca"
      />

      <button className="search__btn" onClick={handleClick}>
        <Search />
      </button>
    </form>
  );

  return <>{isSmallScreen ? MobileStructure : DesktopStructure}</>;
}

export default SearchForm;
