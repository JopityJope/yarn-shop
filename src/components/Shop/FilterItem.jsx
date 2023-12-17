import React from "react";
import DropdownItem from "../../components/Shop/DropdownItem";
import DropdownIcon from "../Icons/DropdownIcon";

function FilterItem({
  label,
  value,
  specialWord,
  active,
  index,
  handleClick,
  isSelected,
  options,
}) {
  return (
    <li
      className={`filter__item dropdown ${active ? "active" : ""}`}
      onClick={() => handleClick(index)}
    >
      {value === "" ? label : `${label}:`}
      <span className="special-word">{specialWord}</span>
      <DropdownIcon />
      <div className="dropdown__menu">
        {options.map((element, optionIndex) => (
          <DropdownItem
            key={optionIndex}
            name={element.name.charAt(0).toUpperCase() + element.name.slice(1)}
            handleClick={() => handleClick(element, optionIndex)}
            isSelected={optionIndex === isSelected}
          />
        ))}
      </div>
    </li>
  );
}

export default FilterItem;
