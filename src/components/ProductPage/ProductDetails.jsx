import React from "react";

function ProductDetails({ selectedYarn }) {
  return (
    <div className="product__details">
      {selectedYarn.contents.content && (
        <p>
          <strong>Content: </strong>
          {selectedYarn.contents.content}
        </p>
      )}
      {selectedYarn.thickness && (
        <p>
          <strong>Yarn Group: </strong>
          {selectedYarn.thickness}
        </p>
      )}
      {selectedYarn.weight && selectedYarn.length && (
        <p>
          <strong>Weight: </strong>
          {selectedYarn.weight} g = {selectedYarn.length} m
        </p>
      )}
      {selectedYarn.needle && (
        <p>
          <strong>Recommended needle size: </strong>
          {selectedYarn.needle}
        </p>
      )}
      {selectedYarn.gauge && (
        <p>
          <strong>Gauge: </strong>
          {selectedYarn.gauge}
        </p>
      )}
      {selectedYarn.care && (
        <p>
          <strong>Care: </strong>
          {selectedYarn.care}
        </p>
      )}
      {selectedYarn.madeIn && (
        <p>
          <strong>Made in: </strong>
          {selectedYarn.madeIn}
        </p>
      )}
    </div>
  );
}

export default ProductDetails;
