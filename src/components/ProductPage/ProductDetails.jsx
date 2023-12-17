import React from "react";

function ProductDetails({ selectedYarn }) {
  return (
    <div className="product__details">
      <p>
        <strong>Content: </strong>
        {selectedYarn.contents.content}
      </p>

      <p>
        <strong>Yarn Group: </strong>
        {selectedYarn.thickness}
      </p>

      <p>
        <strong>Weight: </strong>
        {selectedYarn.weight} g = {selectedYarn.legth} m
      </p>
      <p>
        <strong>Recommended needle size: </strong>
        {selectedYarn.needle}
      </p>

      <p>
        <strong>Gauge: </strong>
        {selectedYarn.gauge}
      </p>
      <p>
        <strong>Care: </strong>
        {selectedYarn.care}
      </p>

      <p>
        <strong>Made in: </strong>
        {selectedYarn.madeIn}
      </p>
    </div>
  );
}

export default ProductDetails;
