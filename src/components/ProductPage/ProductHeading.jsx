import React from "react";
import { Link } from "react-router-dom";
import { calculateSale } from "../../utils/utils";

function ProductHeading({ selectedYarn }) {
  return (
    <div className="product__heading">
      <div className="product__header">
        <nav aria-label="breadcrumb" className="breadcrumb__nav">
          <ol className="breadcrumb">
            <Link to="/">All yarns</Link>
          </ol>
          {selectedYarn.name && (
            <ol className="breadcrumb"> / {selectedYarn.name}</ol>
          )}
        </nav>

        {selectedYarn.name && (
          <h2 className="heading-secondary">{selectedYarn.name}</h2>
        )}

        {selectedYarn.description && (
          <h3 className="heading-tertiary">{selectedYarn.description}</h3>
        )}
      </div>

      {selectedYarn.price && (
        <div className="product__price">
          {!selectedYarn.sale ? (
            <p className="product__price">{selectedYarn.price}€</p>
          ) : (
            <>
              <p className="yarn__price--old">{selectedYarn.price}€</p>
              <p className="yarn__price--sale">
                {calculateSale(selectedYarn.price)}€
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductHeading;
