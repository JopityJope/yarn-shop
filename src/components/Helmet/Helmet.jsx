import React from "react";

function Helmet(props) {
  document.title = `Drops - ${props.title}`;
  return <>{props.children}</>;
}

export default Helmet;
