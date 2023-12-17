import React, { useState, useEffect } from "react";
import DropdownItem from "../../components/Shop/DropdownItem";
import DropdownIcon from "../Icons/DropdownIcon";
import Filtering from "../Icons/Filtering";
import Checkbox from "../Icons/Checkbox";

function Filter({
  contentFilter,
  handleContentFilterClick,
  yarnGroupFilter,
  selectedContentIndex,
  handleYarnGroupFilterClick,
  selectedYarnGroupIndex,
  handleSaleClick,
  saleChecked,
  handleSortingClick,
  selectedSortingIndex,
  activeIndex,
  dropdownRefs,
  handleFilterItemClick,
  dropdownRefMobile,
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth <= 760
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

  const capitalizeFirstLetter = (word) => {
    return word.name.charAt(0).toUpperCase() + word.name.slice(1);
  };

  const content = [
    { name: "all" },
    { name: "alpaca" },
    { name: "cotton" },
    { name: "linen" },
    { name: "mohair" },
    { name: "silk" },
    { name: "wool" },
  ];
  const yarnGroup = [
    { name: "all" },
    { name: "A (sport, lace, fingering)", thickness: "A / 5 ply / sport" },
    { name: "B (DK, worsted)", thickness: "B / 8 ply / DK / worsted" },
    { name: "C (aran, worsted)", thickness: "C / 10 ply / aran / worsted" },
    { name: "D (chunky)", thickness: "D / 12 ply / chunky" },
    { name: "E (super bulky)", thickness: "E / 14 ply / super bulky" },
    {
      name: "F (super bulky, jumbo)",
      thickness: "F / 14 ply / super bulky / jumbo",
    },
  ];

  const sorting = [{ name: "name" }, { name: "price" }, { name: "thickness" }];

  const [isFilterMenuActive, setIsFilterMenuActive] = useState(false);
  const [isContentActive, setIsContentActive] = useState(false);
  const [isYarnGroupActive, setIsYarnGroupActive] = useState(false);

  const closeFilterMenu = () => {
    setIsFilterMenuActive(false);
    setIsContentActive(false);
    setIsYarnGroupActive(false);
  };

  const MobileFiltering = () => (
    <>
      <div className="filter">
        <div className="filter__container">
          <div
            className={`filter__item filter`}
            onClick={() => {
              setIsFilterMenuActive(!isFilterMenuActive);
            }}
          >
            <Filtering /> Filter by
          </div>
        </div>

        <div className="filter__container">
          <div
            className={`filter__item dropdown ${
              activeIndex === 3 ? "active" : ""
            }`}
            ref={dropdownRefMobile}
            onClick={(e) => handleFilterItemClick(3, e)}
          >
            Sort by <DropdownIcon />
            <div className="dropdown__menu right">
              {sorting.map((element, index) => {
                return (
                  <DropdownItem
                    key={index}
                    name={capitalizeFirstLetter(element)}
                    handleClick={() => handleSortingClick(element, index)}
                    isSelected={index === selectedSortingIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`filter__menu ${isFilterMenuActive ? "active" : ""}`}>
        <div className="filter__container--mobile">
          <div
            className="filter__category"
            onClick={() => setIsContentActive(!isContentActive)}
          >
            {contentFilter === "" ? "content" : "content:"}
            <span className="special-word">{contentFilter}</span>
          </div>
          <div className={`filter__options ${isContentActive ? "active" : ""}`}>
            {content.map((element, index) => {
              return (
                <DropdownItem
                  key={index}
                  name={capitalizeFirstLetter(element)}
                  handleClick={() => {
                    handleContentFilterClick(element, index);
                    closeFilterMenu();
                  }}
                  isSelected={index === selectedContentIndex}
                />
              );
            })}
          </div>
        </div>
        <div className="filter__container--mobile">
          <div
            className="filter__category"
            onClick={() => setIsYarnGroupActive(!isYarnGroupActive)}
          >
            {yarnGroupFilter === "" ? "yarn group" : "yarn group:"}
            <span className="special-word">{yarnGroupFilter}</span>
          </div>
          <div
            className={`filter__options ${isYarnGroupActive ? "active" : ""}`}
          >
            {yarnGroup.map((element, index) => {
              return (
                <DropdownItem
                  key={index}
                  name={capitalizeFirstLetter(element)}
                  handleClick={() => {
                    handleYarnGroupFilterClick(element, index);
                    closeFilterMenu();
                  }}
                  isSelected={index === selectedYarnGroupIndex}
                />
              );
            })}
          </div>
        </div>
        <div className="filter__container--mobile">
          <div
            className="filter__category sale"
            onClick={() => {
              handleSaleClick();
              closeFilterMenu();
            }}
          >
            <Checkbox checked={saleChecked} /> {"sale".toUpperCase()}
          </div>
        </div>
      </div>
    </>
  );

  const DesktopFiltering = () => (
    <>
      <div className="filter">
        <ul className="filter__container">
          <li
            className={`filter__item dropdown ${
              activeIndex === 0 ? "active" : ""
            }`}
            ref={dropdownRefs[0]}
            onClick={(e) => handleFilterItemClick(0, e)}
          >
            {contentFilter === "" ? "Content" : "Content:"}
            <span className="special-word">{contentFilter}</span>
            <DropdownIcon />
            <div className="dropdown__menu">
              {content.map((element, index) => {
                return (
                  <DropdownItem
                    key={index}
                    name={capitalizeFirstLetter(element)}
                    handleClick={() => {
                      handleContentFilterClick(element, index);
                    }}
                    isSelected={index === selectedContentIndex}
                  />
                );
              })}
            </div>
          </li>

          <li
            className={`filter__item dropdown ${
              activeIndex === 1 ? "active" : ""
            }`}
            ref={dropdownRefs[1]}
            onClick={(e) => handleFilterItemClick(1, e)}
          >
            {yarnGroupFilter === "" ? "Yarn group" : "Yarn group:"}
            <span className="special-word">{yarnGroupFilter[0]}</span>
            <DropdownIcon />
            <div className="dropdown__menu">
              {yarnGroup.map((element, index) => {
                return (
                  <DropdownItem
                    key={index}
                    name={capitalizeFirstLetter(element)}
                    handleClick={() =>
                      handleYarnGroupFilterClick(element, index)
                    }
                    isSelected={index === selectedYarnGroupIndex}
                  />
                );
              })}
            </div>
          </li>

          <li className="filter__item sale" onClick={() => handleSaleClick()}>
            <Checkbox checked={saleChecked} />
            Sale
          </li>
        </ul>

        <div className="filter__container">
          <div
            className={`filter__item dropdown ${
              activeIndex === 2 ? "active" : ""
            }`}
            ref={dropdownRefs[2]}
            onClick={(e) => handleFilterItemClick(2, e)}
          >
            Sort by <DropdownIcon />
            <div className="dropdown__menu right">
              {sorting.map((element, index) => {
                return (
                  <DropdownItem
                    key={index}
                    name={capitalizeFirstLetter(element)}
                    handleClick={() => handleSortingClick(element, index)}
                    isSelected={index === selectedSortingIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return <> {isSmallScreen ? <MobileFiltering /> : <DesktopFiltering />}</>;
}

export default Filter;
