import React from "react";

function DropdownItem(props) {
  return (
    <div className="dropdown__item" onClick={props.handleClick}>
      <button
        className={
          props.isSelected ? "dropdown__link active" : "dropdown__link"
        }
      >
        {props.name}
      </button>
    </div>
  );
}

export default DropdownItem;
