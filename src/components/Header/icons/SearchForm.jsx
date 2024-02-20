import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Close from "./Close";
import { useNavigate } from "react-router-dom";

function SearchForm({ isActiveMobile, onClose }) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= 990
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
    if (searchQuery.trim() !== "") {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);

      setIsActive(false);
      onClose();

      setTimeout(() => {
        setSearchQuery("");
      }, 1000);
    }
  };

  const handleCloseClickMobile = () => {
    setIsActive(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);

        setIsActive(false);
        onClose();

        setTimeout(() => {
          setSearchQuery("");
        }, 1000);
      }
    } else if (e.key === "Escape") {
      handleCloseClickMobile();
    }
  };

  //Mobile
  const MobileStructure = (
    <div
      onKeyDown={handleKeyDown}
      className={isActiveMobile ? "search--mobile active" : "search--mobile"}
    >
      <button className="search__btn--mobile" onClick={handleSubmit}>
        <Search />
      </button>
      <input
        className="search__input--mobile"
        type="text"
        placeholder="i.e. alpaca"
        value={searchQuery}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <button className="close__btn--mobile" onClick={handleCloseClickMobile}>
        <Close />
      </button>
    </div>
  );

  //Desktop
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    setIsActive(true);
  };

  const handleBlur = (event) => {
    const clickedButton = event.relatedTarget;
    if (!clickedButton || !clickedButton.classList.contains("submit___btn")) {
      setIsActive(false);
      setSearchQuery("");
    }
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
        value={searchQuery}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {isActive ? (
        <button className="submit___btn" onClick={handleSubmit}>
          <Search />
        </button>
      ) : (
        <button className="search__btn" onClick={handleClick}>
          <Search />
        </button>
      )}
    </form>
  );

  return <>{isSmallScreen ? MobileStructure : DesktopStructure}</>;
}

export default SearchForm;
