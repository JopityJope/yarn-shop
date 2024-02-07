import React from "react";

function BagFilled({ children }) {
  return (
    <>
      <svg
        className="modal__bag"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 181 176"
      >
        <path
          d="M263,126v-5.5a43.5,43.5,0,0,0-87,0V126H129V253H310V126Zm-82-5.5a38.5,38.5,0,0,1,77,0V126H181Z"
          transform="translate(-129 -77)"
        />
      </svg>
      {children}
    </>
  );
}

export default BagFilled;
