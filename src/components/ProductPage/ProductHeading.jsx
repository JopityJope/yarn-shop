import React from "react";
import { Link } from "react-router-dom";

function ProductHeading({ selectedYarn }) {
  return (
    <div className="product__heading">
      <div className="product__header">
        <nav aria-label="breadcrumb" className="breadcrumb__nav">
          <ol className="breadcrumb">
            <Link to="/">All yarns</Link>
          </ol>
          <ol className="breadcrumb"> / {selectedYarn.name}</ol>
        </nav>
        <h2 className="heading-secondary">{selectedYarn.name}</h2>
        <h3 className="heading-tertiary">{selectedYarn.description}</h3>
      </div>
      <div className="product__price">
        <p className="product__price">{selectedYarn.price} €</p>
      </div>
    </div>
  );
}

export default ProductHeading;
