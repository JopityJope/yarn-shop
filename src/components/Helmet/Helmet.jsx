import React from "react";

function Helmet(props) {
  document.title = `Drops - ${props.title}`;
  return <div>{props.children}</div>;
}

export default Helmet;
