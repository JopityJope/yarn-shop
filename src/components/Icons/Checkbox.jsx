import React from "react";

function Checkbox(props) {
  if (props.checked === true) {
    return (
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175 175"
        className="checkbox__icon"
      >
        <polygon points="65.75 114.18 44.46 92.66 36.64 100.4 65.75 129.82 138.91 55.87 131.09 48.13 65.75 114.18" />
        <path
          d="M320.15,162.37h-140a17.52,17.52,0,0,0-17.5,17.5v140a17.52,17.52,0,0,0,17.5,17.5h140a17.52,17.52,0,0,0,17.5-17.5v-140A17.52,17.52,0,0,0,320.15,162.37Zm6.5,157.5a6.51,6.51,0,0,1-6.5,6.5h-140a6.51,6.51,0,0,1-6.5-6.5v-140a6.51,6.51,0,0,1,6.5-6.5h140a6.51,6.51,0,0,1,6.5,6.5Z"
          transform="translate(-162.65 -162.37)"
        />
      </svg>
    );
  } else {
    return (
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175 175"
        className="checkbox__icon"
      >
        <path
          d="M320.5,322h-140A17.52,17.52,0,0,1,163,304.5v-140A17.52,17.52,0,0,1,180.5,147h140A17.52,17.52,0,0,1,338,164.5v140A17.52,17.52,0,0,1,320.5,322Zm-140-164a6.51,6.51,0,0,0-6.5,6.5v140a6.51,6.51,0,0,0,6.5,6.5h140a6.51,6.51,0,0,0,6.5-6.5v-140a6.51,6.51,0,0,0-6.5-6.5Z"
          transform="translate(-163 -147)"
        />
      </svg>
    );
  }
}

export default Checkbox;
