import React from "react";

function Modal({ children, open, className }) {
  if (!open) return null;
  return <div className={className}>{children}</div>;
}

export default Modal;
